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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"name": "Cost",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "InstanceType",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Memory",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MonthlyPrice",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "Network",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "SpotPrice",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Storage",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "VCPUS",
						"req": true,
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
								"parts": []any{},
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
