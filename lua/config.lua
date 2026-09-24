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
            ["name"] = "Cost",
            ["title"] = "Cost",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Hourly cost for on-demand Linux instance in USD",
            ["format"] = "float",
          },
          {
            ["name"] = "InstanceType",
            ["title"] = "Instance Type",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The EC2 instance type (e.g., 't2.micro', 'm5.large')",
          },
          {
            ["name"] = "Memory",
            ["title"] = "Memory",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Amount of memory available in GiB",
          },
          {
            ["name"] = "MonthlyPrice",
            ["title"] = "Monthly Price",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Estimated monthly cost in USD (Cost * 730 hours)",
            ["format"] = "float",
          },
          {
            ["name"] = "Network",
            ["title"] = "Network",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Network performance capability",
          },
          {
            ["name"] = "SpotPrice",
            ["title"] = "Spot Price",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Current spot instance hourly price in USD, or 'NA' if not available for spot pricing",
          },
          {
            ["name"] = "Storage",
            ["title"] = "Storage",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')",
          },
          {
            ["name"] = "VCPUS",
            ["title"] = "Vcpus",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "Number of virtual CPUs",
          },
        },
        ["name"] = "get_instance_pricing",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["segments"] = {},
                ["parts"] = {},
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "filter",
                      ["orig"] = "filter",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "i3",
                    },
                    {
                      ["name"] = "json",
                      ["orig"] = "json",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "price",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "filter",
                    "json",
                    "sort",
                  },
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
