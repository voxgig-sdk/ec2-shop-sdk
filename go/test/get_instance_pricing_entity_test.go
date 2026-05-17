package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ec2-shop-sdk/go"
	"github.com/voxgig-sdk/ec2-shop-sdk/go/core"

	vs "github.com/voxgig-sdk/ec2-shop-sdk/go/utility/struct"
)

func TestGetInstancePricingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetInstancePricing(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetInstancePricingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_instance_pricingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_instance_pricing." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set EC_SHOP_TEST_GET_INSTANCE_PRICING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getInstancePricingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_instance_pricing", setup.data)))
		var getInstancePricingRef01Data map[string]any
		if len(getInstancePricingRef01DataRaw) > 0 {
			getInstancePricingRef01Data = core.ToMapAny(getInstancePricingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getInstancePricingRef01Data

		// LIST
		getInstancePricingRef01Ent := client.GetInstancePricing(nil)
		getInstancePricingRef01Match := map[string]any{}

		getInstancePricingRef01ListResult, err := getInstancePricingRef01Ent.List(getInstancePricingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, getInstancePricingRef01ListOk := getInstancePricingRef01ListResult.([]any)
		if !getInstancePricingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", getInstancePricingRef01ListResult)
		}

	})
}

func get_instance_pricingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_instance_pricing", "GetInstancePricingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_instance_pricing test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_instance_pricing test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_instance_pricing01", "get_instance_pricing02", "get_instance_pricing03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("EC_SHOP_TEST_GET_INSTANCE_PRICING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EC_SHOP_TEST_GET_INSTANCE_PRICING_ENTID": idmap,
		"EC_SHOP_TEST_LIVE":      "FALSE",
		"EC_SHOP_TEST_EXPLAIN":   "FALSE",
		"EC_SHOP_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EC_SHOP_TEST_GET_INSTANCE_PRICING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["EC_SHOP_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["EC_SHOP_APIKEY"],
			},
			extra,
		})
		client = sdk.NewEc2ShopSDK(core.ToMapAny(mergedOpts))
	}

	live := env["EC_SHOP_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["EC_SHOP_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
