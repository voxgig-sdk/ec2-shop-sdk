-- Ec2Shop SDK exists test

local sdk = require("ec2-shop_sdk")

describe("Ec2ShopSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
