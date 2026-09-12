package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Ec2Shop",
			"slug": "ec2-shop",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://ec2.shop",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_instance_pricing": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_instance_pricing": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "float",
						"name": "Cost",
						"req": true,
						"short": "Hourly cost for on-demand Linux instance in USD",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "InstanceType",
						"req": true,
						"short": "The EC2 instance type (e.g., 't2.micro', 'm5.large')",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Memory",
						"req": true,
						"short": "Amount of memory available in GiB",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "float",
						"name": "MonthlyPrice",
						"req": true,
						"short": "Estimated monthly cost in USD (Cost * 730 hours)",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "Network",
						"req": true,
						"short": "Network performance capability",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "SpotPrice",
						"req": true,
						"short": "Current spot instance hourly price in USD, or 'NA' if not available for spot pricing",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Storage",
						"req": true,
						"short": "Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "VCPUS",
						"req": true,
						"short": "Number of virtual CPUs",
						"type": "`$INTEGER`",
					},
				},
				"name": "get_instance_pricing",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "i3",
											"kind": "query",
											"name": "filter",
											"orig": "filter",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "json",
											"orig": "json",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "price",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"select": map[string]any{
									"exist": []any{
										"filter",
										"json",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
