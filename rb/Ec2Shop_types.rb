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
# @!attribute [rw] cost
#   @return [Float]
#
# @!attribute [rw] instance_type
#   @return [String]
#
# @!attribute [rw] memory
#   @return [String]
#
# @!attribute [rw] monthly_price
#   @return [Float]
#
# @!attribute [rw] network
#   @return [String]
#
# @!attribute [rw] spot_price
#   @return [String]
#
# @!attribute [rw] storage
#   @return [String]
#
# @!attribute [rw] vcpus
#   @return [Integer]
GetInstancePricing = Struct.new(
  :cost,
  :instance_type,
  :memory,
  :monthly_price,
  :network,
  :spot_price,
  :storage,
  :vcpus,
  keyword_init: true
)

# Request payload for GetInstancePricing#list.
#
# @!attribute [rw] cost
#   @return [Float, nil]
#
# @!attribute [rw] instance_type
#   @return [String, nil]
#
# @!attribute [rw] memory
#   @return [String, nil]
#
# @!attribute [rw] monthly_price
#   @return [Float, nil]
#
# @!attribute [rw] network
#   @return [String, nil]
#
# @!attribute [rw] spot_price
#   @return [String, nil]
#
# @!attribute [rw] storage
#   @return [String, nil]
#
# @!attribute [rw] vcpus
#   @return [Integer, nil]
GetInstancePricingListMatch = Struct.new(
  :cost,
  :instance_type,
  :memory,
  :monthly_price,
  :network,
  :spot_price,
  :storage,
  :vcpus,
  keyword_init: true
)

