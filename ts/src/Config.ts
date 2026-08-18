
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Ec2Shop',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://ec2.shop",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_instance_pricing: {
      },

    }
  }


  entity = {
    "get_instance_pricing": {
      "fields": [
        {
          "name": "Cost",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "InstanceType",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "Memory",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "MonthlyPrice",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "Network",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "SpotPrice",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "Storage",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "VCPUS",
          "req": true,
          "type": "`$INTEGER`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "json",
                    "orig": "json",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "price",
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {
                "exist": [
                  "filter",
                  "json",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

