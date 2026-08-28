// Typed models for the Ec2Shop SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetInstancePricing {
  Cost: number
  InstanceType: string
  Memory: string
  MonthlyPrice: number
  Network: string
  SpotPrice: string
  Storage: string
  VCPUS: number
}

export interface GetInstancePricingListMatch {
  filter?: string
  json?: string
  sort?: string
}

