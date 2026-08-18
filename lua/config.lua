-- Ec2Shop SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
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
            ["name"] = "Cost",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "InstanceType",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Memory",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "MonthlyPrice",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "Network",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "SpotPrice",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Storage",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "VCPUS",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "get_instance_pricing",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "i3",
                      ["kind"] = "query",
                      ["name"] = "filter",
                      ["orig"] = "filter",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "json",
                      ["orig"] = "json",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "price",
                      ["kind"] = "query",
                      ["name"] = "sort",
                      ["orig"] = "sort",
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
              },
            },
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
