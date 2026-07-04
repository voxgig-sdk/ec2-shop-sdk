-- Typed models for the Ec2Shop SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetInstancePricing
---@field cost number
---@field instance_type string
---@field memory string
---@field monthly_price number
---@field network string
---@field spot_price string
---@field storage string
---@field vcpus number

---@class GetInstancePricingListMatch

local M = {}

return M
