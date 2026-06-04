# Ec2Shop SDK configuration


def make_config():
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
            "name": "cost",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "instance_type",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "memory",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "monthly_price",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "network",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "spot_price",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "storage",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "vcpus",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 7,
          },
        ],
        "name": "get_instance_pricing",
        "op": {
          "list": {
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
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "json",
                      "orig": "json",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "price",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/",
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
                "active": True,
                "parts": [],
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
