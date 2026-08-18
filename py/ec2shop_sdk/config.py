# Ec2Shop SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "InstanceType",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "Memory",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "MonthlyPrice",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "Network",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "SpotPrice",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "Storage",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "VCPUS",
            "req": True,
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
                "parts": [],
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
