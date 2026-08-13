package core

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
						"active": true,
						"name": "Cost",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "InstanceType",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "Memory",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "MonthlyPrice",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "Network",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "SpotPrice",
						"req": true,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "Storage",
						"req": true,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "VCPUS",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 7,
					},
				},
				"name": "get_instance_pricing",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "i3",
											"kind": "query",
											"name": "filter",
											"orig": "filter",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "json",
											"orig": "json",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "price",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"reqd": false,
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
								"index$": 0,
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
