
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

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Ec2Shop',
        slug: "ec2-shop",
    version: "0.0.1",
    target: "ts",

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
          "short": "Hourly cost for on-demand Linux instance in USD",
          "type": "`$NUMBER`"
        },
        {
          "name": "InstanceType",
          "req": true,
          "short": "The EC2 instance type (e.g., 't2.micro', 'm5.large')",
          "type": "`$STRING`"
        },
        {
          "name": "Memory",
          "req": true,
          "short": "Amount of memory available in GiB",
          "type": "`$STRING`"
        },
        {
          "name": "MonthlyPrice",
          "req": true,
          "short": "Estimated monthly cost in USD (Cost * 730 hours)",
          "type": "`$NUMBER`"
        },
        {
          "name": "Network",
          "req": true,
          "short": "Network performance capability",
          "type": "`$STRING`"
        },
        {
          "name": "SpotPrice",
          "req": true,
          "short": "Current spot instance hourly price in USD, or 'NA' if not available for spot pricing",
          "type": "`$STRING`"
        },
        {
          "name": "Storage",
          "req": true,
          "short": "Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')",
          "type": "`$STRING`"
        },
        {
          "name": "VCPUS",
          "req": true,
          "short": "Number of virtual CPUs",
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

