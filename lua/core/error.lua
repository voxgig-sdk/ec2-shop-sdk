-- Ec2Shop SDK error

local Ec2ShopError = {}
Ec2ShopError.__index = Ec2ShopError


function Ec2ShopError.new(code, msg, ctx)
  local self = setmetatable({}, Ec2ShopError)
  self.is_sdk_error = true
  self.sdk = "Ec2Shop"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function Ec2ShopError:error()
  return self.msg
end


function Ec2ShopError:__tostring()
  return self.msg
end


return Ec2ShopError
