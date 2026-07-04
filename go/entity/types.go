// Typed models for the Ec2Shop SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GetInstancePricing is the typed data model for the get_instance_pricing entity.
type GetInstancePricing struct {
	Cost float64 `json:"cost"`
	InstanceType string `json:"instance_type"`
	Memory string `json:"memory"`
	MonthlyPrice float64 `json:"monthly_price"`
	Network string `json:"network"`
	SpotPrice string `json:"spot_price"`
	Storage string `json:"storage"`
	Vcpus int `json:"vcpus"`
}

// GetInstancePricingListMatch mirrors the get_instance_pricing fields as an all-optional match
// filter (Go analog of Partial<GetInstancePricing>).
type GetInstancePricingListMatch struct {
	Cost *float64 `json:"cost,omitempty"`
	InstanceType *string `json:"instance_type,omitempty"`
	Memory *string `json:"memory,omitempty"`
	MonthlyPrice *float64 `json:"monthly_price,omitempty"`
	Network *string `json:"network,omitempty"`
	SpotPrice *string `json:"spot_price,omitempty"`
	Storage *string `json:"storage,omitempty"`
	Vcpus *int `json:"vcpus,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
