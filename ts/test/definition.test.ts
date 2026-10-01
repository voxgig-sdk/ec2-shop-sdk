import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "get_instance_pricing",
    "accessor": "GetInstancePricing",
    "op": "list",
    "method": "GET",
    "path": "/",
    "args": [],
    "select": {
      "filter": "v1",
      "json": "v1",
      "sort": "v1"
    },
    "headers": [],
    "query": [
      "filter",
      "sort",
      "json"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "InstanceType": "r3.xlarge",
        "Memory": "30.5 GiB",
        "VCPUS": 4,
        "Storage": "1 x 80 SSD",
        "Network": "Moderate",
        "Cost": 0.333,
        "MonthlyPrice": 243.09,
        "SpotPrice": "0.0650"
      },
      {
        "InstanceType": "m5.xlarge",
        "Memory": "16 GiB",
        "VCPUS": 4,
        "Storage": "EBS only",
        "Network": "Up to 10 Gigabit",
        "Cost": 0.192,
        "MonthlyPrice": 140.16,
        "SpotPrice": "0.0806"
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
