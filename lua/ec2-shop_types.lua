-- Typed models for the Ec2Shop SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetInstancePricing
---@field Cost number
---@field InstanceType string
---@field Memory string
---@field MonthlyPrice number
---@field Network string
---@field SpotPrice string
---@field Storage string
---@field VCPUS number

---@class GetInstancePricingListMatch
---@field Cost? number
---@field InstanceType? string
---@field Memory? string
---@field MonthlyPrice? number
---@field Network? string
---@field SpotPrice? string
---@field Storage? string
---@field VCPUS? number

local M = {}

return M
