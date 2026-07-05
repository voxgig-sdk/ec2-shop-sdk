// Typed models for the Ec2Shop SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetInstancePricing {
  cost: number
  instance_type: string
  memory: string
  monthly_price: number
  network: string
  spot_price: string
  storage: string
  vcpus: number
}

export interface GetInstancePricingListMatch {
  cost?: number
  instance_type?: string
  memory?: string
  monthly_price?: number
  network?: string
  spot_price?: string
  storage?: string
  vcpus?: number
}

