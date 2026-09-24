# Ec2Shop SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Ec2Shop",
            "slug": "ec2-shop",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://ec2.shop",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_instance_pricing": {},
            },
        },
        "entity": {
      "get_instance_pricing": {
        "fields": [
          {
            "name": "Cost",
            "title": "Cost",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Hourly cost for on-demand Linux instance in USD",
            "format": "float",
          },
          {
            "name": "InstanceType",
            "title": "Instance Type",
            "type": "`$STRING`",
            "req": True,
            "short": "The EC2 instance type (e.g., 't2.micro', 'm5.large')",
          },
          {
            "name": "Memory",
            "title": "Memory",
            "type": "`$STRING`",
            "req": True,
            "short": "Amount of memory available in GiB",
          },
          {
            "name": "MonthlyPrice",
            "title": "Monthly Price",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Estimated monthly cost in USD (Cost * 730 hours)",
            "format": "float",
          },
          {
            "name": "Network",
            "title": "Network",
            "type": "`$STRING`",
            "req": True,
            "short": "Network performance capability",
          },
          {
            "name": "SpotPrice",
            "title": "Spot Price",
            "type": "`$STRING`",
            "req": True,
            "short": "Current spot instance hourly price in USD, or 'NA' if not available for spot pricing",
          },
          {
            "name": "Storage",
            "title": "Storage",
            "type": "`$STRING`",
            "req": True,
            "short": "Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')",
          },
          {
            "name": "VCPUS",
            "title": "Vcpus",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of virtual CPUs",
          },
        ],
        "name": "get_instance_pricing",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "segments": [],
                "parts": [],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "filter",
                      "orig": "filter",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "i3",
                    },
                    {
                      "name": "json",
                      "orig": "json",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "price",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "filter",
                    "json",
                    "sort",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
