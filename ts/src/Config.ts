
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://ec2.shop',

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
          "name": "cost",
          "req": true,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "instance_type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "memory",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "monthly_price",
          "req": true,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "network",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "spot_price",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "storage",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "vcpus",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        }
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "json",
                    "orig": "json",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "price",
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/",
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
              },
              "active": true,
              "parts": [],
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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

