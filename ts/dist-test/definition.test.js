"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "get_instance_pricing",
        "accessor": "GetInstancePricing",
        "op": "list",
        "method": "GET",
        "path": "/",
        "args": [],
        "select": {
            "filter": "i3",
            "json": "v1",
            "sort": "price"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "text/plain"
        ],
        "query": [
            "filter",
            "sort",
            "json"
        ],
        "queryArgs": [
            {
                "name": "filter",
                "wire": "filter"
            },
            {
                "name": "json",
                "wire": "json"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
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
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map