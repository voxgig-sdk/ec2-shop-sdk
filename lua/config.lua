-- Ec2Shop SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Ec2Shop",
      slug = "ec2-shop",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
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
            ["format"] = "float",
            ["name"] = "Cost",
            ["req"] = true,
            ["short"] = "Hourly cost for on-demand Linux instance in USD",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "InstanceType",
            ["req"] = true,
            ["short"] = "The EC2 instance type (e.g., 't2.micro', 'm5.large')",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Memory",
            ["req"] = true,
            ["short"] = "Amount of memory available in GiB",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "float",
            ["name"] = "MonthlyPrice",
            ["req"] = true,
            ["short"] = "Estimated monthly cost in USD (Cost * 730 hours)",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "Network",
            ["req"] = true,
            ["short"] = "Network performance capability",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "SpotPrice",
            ["req"] = true,
            ["short"] = "Current spot instance hourly price in USD, or 'NA' if not available for spot pricing",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Storage",
            ["req"] = true,
            ["short"] = "Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "VCPUS",
            ["req"] = true,
            ["short"] = "Number of virtual CPUs",
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
                ["segments"] = {},
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
                ["parts"] = {},
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
