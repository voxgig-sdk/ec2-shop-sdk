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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "format": "float",
            "name": "Cost",
            "req": True,
            "short": "Hourly cost for on-demand Linux instance in USD",
            "type": "`$NUMBER`",
          },
          {
            "name": "InstanceType",
            "req": True,
            "short": "The EC2 instance type (e.g., 't2.micro', 'm5.large')",
            "type": "`$STRING`",
          },
          {
            "name": "Memory",
            "req": True,
            "short": "Amount of memory available in GiB",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "MonthlyPrice",
            "req": True,
            "short": "Estimated monthly cost in USD (Cost * 730 hours)",
            "type": "`$NUMBER`",
          },
          {
            "name": "Network",
            "req": True,
            "short": "Network performance capability",
            "type": "`$STRING`",
          },
          {
            "name": "SpotPrice",
            "req": True,
            "short": "Current spot instance hourly price in USD, or 'NA' if not available for spot pricing",
            "type": "`$STRING`",
          },
          {
            "name": "Storage",
            "req": True,
            "short": "Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')",
            "type": "`$STRING`",
          },
          {
            "name": "VCPUS",
            "req": True,
            "short": "Number of virtual CPUs",
            "type": "`$INTEGER`",
          },
        ],
        "name": "get_instance_pricing",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "i3",
                      "kind": "query",
                      "name": "filter",
                      "orig": "filter",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "json",
                      "orig": "json",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "price",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "segments": [],
                "select": {
                  "exist": [
                    "filter",
                    "json",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [],
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
