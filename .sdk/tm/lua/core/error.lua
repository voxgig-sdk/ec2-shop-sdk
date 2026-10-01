-- Ec2Shop SDK error

local json = require("dkjson")

local Ec2ShopError = {}
Ec2ShopError.__index = Ec2ShopError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function Ec2ShopError.new(code, msg, ctx)
  local self = setmetatable({}, Ec2ShopError)
  self.is_sdk_error = true
  self.sdk = "Ec2Shop"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function Ec2ShopError:context()
  return CONTEXT[self]
end


function Ec2ShopError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function Ec2ShopError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function Ec2ShopError:to_json()
  return json.encode(self:to_table())
end


function Ec2ShopError:__tostring()
  return self.msg
end


function Ec2ShopError.__tojson(self)
  return self:to_json()
end


return Ec2ShopError
