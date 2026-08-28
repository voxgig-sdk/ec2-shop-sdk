# frozen_string_literal: true

# Typed models for the Ec2Shop SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetInstancePricing entity data model.
#
# @!attribute [rw] Cost
#   @return [Float]
#
# @!attribute [rw] InstanceType
#   @return [String]
#
# @!attribute [rw] Memory
#   @return [String]
#
# @!attribute [rw] MonthlyPrice
#   @return [Float]
#
# @!attribute [rw] Network
#   @return [String]
#
# @!attribute [rw] SpotPrice
#   @return [String]
#
# @!attribute [rw] Storage
#   @return [String]
#
# @!attribute [rw] VCPUS
#   @return [Integer]
GetInstancePricing = Struct.new(
  :Cost,
  :InstanceType,
  :Memory,
  :MonthlyPrice,
  :Network,
  :SpotPrice,
  :Storage,
  :VCPUS,
  keyword_init: true
)

# Request payload for GetInstancePricing#list.
#
# @!attribute [rw] filter
#   @return [String, nil]
#
# @!attribute [rw] json
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
GetInstancePricingListMatch = Struct.new(
  :filter,
  :json,
  :sort,
  keyword_init: true
)

