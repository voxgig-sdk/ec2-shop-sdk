# Ec2Shop SDK configuration

module Ec2ShopConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Ec2Shop",
        "slug" => "ec2-shop",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://ec2.shop",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_instance_pricing" => {},
        },
      },
      "entity" => {
        "get_instance_pricing" => {
          "fields" => [
            {
              "name" => "Cost",
              "req" => true,
              "short" => "Hourly cost for on-demand Linux instance in USD",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "InstanceType",
              "req" => true,
              "short" => "The EC2 instance type (e.g., 't2.micro', 'm5.large')",
              "type" => "`$STRING`",
            },
            {
              "name" => "Memory",
              "req" => true,
              "short" => "Amount of memory available in GiB",
              "type" => "`$STRING`",
            },
            {
              "name" => "MonthlyPrice",
              "req" => true,
              "short" => "Estimated monthly cost in USD (Cost * 730 hours)",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "Network",
              "req" => true,
              "short" => "Network performance capability",
              "type" => "`$STRING`",
            },
            {
              "name" => "SpotPrice",
              "req" => true,
              "short" => "Current spot instance hourly price in USD, or 'NA' if not available for spot pricing",
              "type" => "`$STRING`",
            },
            {
              "name" => "Storage",
              "req" => true,
              "short" => "Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')",
              "type" => "`$STRING`",
            },
            {
              "name" => "VCPUS",
              "req" => true,
              "short" => "Number of virtual CPUs",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "get_instance_pricing",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "i3",
                        "kind" => "query",
                        "name" => "filter",
                        "orig" => "filter",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "json",
                        "orig" => "json",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "price",
                        "kind" => "query",
                        "name" => "sort",
                        "orig" => "sort",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {
                    "exist" => [
                      "filter",
                      "json",
                      "sort",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    Ec2ShopFeatures.make_feature(name)
  end
end
