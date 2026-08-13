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
# @!attribute [rw] Cost
#   @return [Float, nil]
#
# @!attribute [rw] InstanceType
#   @return [String, nil]
#
# @!attribute [rw] Memory
#   @return [String, nil]
#
# @!attribute [rw] MonthlyPrice
#   @return [Float, nil]
#
# @!attribute [rw] Network
#   @return [String, nil]
#
# @!attribute [rw] SpotPrice
#   @return [String, nil]
#
# @!attribute [rw] Storage
#   @return [String, nil]
#
# @!attribute [rw] VCPUS
#   @return [Integer, nil]
GetInstancePricingListMatch = Struct.new(
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

