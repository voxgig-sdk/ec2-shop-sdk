package = "voxgig-sdk-ec2-shop"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ec2-shop-sdk.git"
}
description = {
  summary = "Ec2Shop SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ec2-shop_sdk"] = "ec2-shop_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
