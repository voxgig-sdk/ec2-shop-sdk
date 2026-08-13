-- Ec2Shop SDK configuration

local function make_config()
  return {
    main = {
      name = "Ec2Shop",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://ec2.shop",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_instance_pricing"] = {},
      },
    },
    entity = {
      ["get_instance_pricing"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "Cost",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "InstanceType",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "Memory",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "MonthlyPrice",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "Network",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "SpotPrice",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "Storage",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "VCPUS",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 7,
          },
        },
        ["name"] = "get_instance_pricing",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "i3",
                      ["kind"] = "query",
                      ["name"] = "filter",
                      ["orig"] = "filter",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "json",
                      ["orig"] = "json",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "price",
                      ["kind"] = "query",
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["parts"] = {},
                ["select"] = {
                  ["exist"] = {
                    "filter",
                    "json",
                    "sort",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
