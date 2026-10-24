"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetInstancePricingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EC2_SHOP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EC2_SHOP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Ec2ShopSDK.test();
        const ent = testsdk.GetInstancePricing();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('get_instance_pricing hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.Ec2ShopSDK.test(offline).GetInstancePricing().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.Ec2ShopSDK.test(offline).GetInstancePricing()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.Ec2ShopSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.GetInstancePricing().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.Ec2ShopSDK.test().GetInstancePricing().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.Ec2ShopSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.GetInstancePricing().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.GetInstancePricing().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.Ec2ShopSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.GetInstancePricing().list({ "filter": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EC2_SHOP_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_instance_pricing.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "Cost": { "a": true, "fo": "float", "h": "Cost", "n": "Cost", "r": true, "sh": "Hourly cost for on-demand Linux instance in USD", "t": "`$NUMBER`", "key$": "Cost", "index$": 0 }, "InstanceType": { "a": true, "h": "Instance Type", "n": "InstanceType", "r": true, "sh": "The EC2 instance type (e.g., 't2.micro', 'm5.large')", "t": "`$STRING`", "key$": "InstanceType", "index$": 1 }, "Memory": { "a": true, "h": "Memory", "n": "Memory", "r": true, "sh": "Amount of memory available in GiB", "t": "`$STRING`", "key$": "Memory", "index$": 2 }, "MonthlyPrice": { "a": true, "fo": "float", "h": "Monthly Price", "n": "MonthlyPrice", "r": true, "sh": "Estimated monthly cost in USD (Cost * 730 hours)", "t": "`$NUMBER`", "key$": "MonthlyPrice", "index$": 3 }, "Network": { "a": true, "h": "Network", "n": "Network", "r": true, "sh": "Network performance capability", "t": "`$STRING`", "key$": "Network", "index$": 4 }, "SpotPrice": { "a": true, "h": "Spot Price", "n": "SpotPrice", "r": true, "sh": "Current spot instance hourly price in USD, or 'NA' if not available for spot pricing", "t": "`$STRING`", "key$": "SpotPrice", "index$": 5 }, "Storage": { "a": true, "h": "Storage", "n": "Storage", "r": true, "sh": "Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')", "t": "`$STRING`", "key$": "Storage", "index$": 6 }, "VCPUS": { "a": true, "h": "Vcpus", "n": "VCPUS", "r": true, "sh": "Number of virtual CPUs", "t": "`$INTEGER`", "key$": "VCPUS", "index$": 7 } }, "name": "get_instance_pricing", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "i3", "k": "query", "n": "filter", "or": "filter", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "json", "or": "json", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "price", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/", "q": {}, "r": {}, "rs": { "alternatives": [{ "kind": "raw", "media": "text/plain" }], "kind": "json", "media": "application/json" }, "s": [], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "get_instance_pricing", "name__orig": "get_instance_pricing", "Name": "GetInstancePricing", "name_": "get_instance_pricing", "name-": "get-instance-pricing", "NAME": "GET_INSTANCE_PRICING", "index$": 0 }, { "active": true, "entity": "get_instance_pricing", "key$": "BasicGetInstancePricingFlow", "kind": "basic", "name": "BasicGetInstancePricingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "get_instance_pricing_ref01" } }], "index$": 0 }] }, 'GetInstancePricing', { "GET /": { "protocol": "http", "parameters": [{ "name": "filter", "in": "query", "description": "Filter instances by various criteria. Supports instance types (e.g., 't2.medium'), storage types (e.g., 'ssd'), and comparison expressions (e.g., 'mem>=32', 'cpu<=4', 'price<0.1', 'spotprice>0.05', 'gpu_core>=1', 'gpu_mem>=8'). Multiple filters can be comma-separated. Use '-' prefix to exclude (e.g., '-t3').", "required": false, "schema": { "type": "string" }, "examples": { "instanceType": { "value": "i3", "description": "Filter for i3 instance types" }, "storageType": { "value": "ssd", "description": "Filter for instances with SSD storage" }, "multipleTypes": { "value": "t2.medium,t3.medium", "description": "Filter for specific instance types" }, "advancedFilter": { "value": "ssd,mem>=32,mem<=64,cpu>=2,cpu<=4", "description": "Advanced filter with multiple criteria" }, "excludeFilter": { "value": "-t3,price<0.1,mem>=2", "description": "Exclude t3 instances with additional criteria" } }, "index$": 0 }, { "name": "sort", "in": "query", "description": "Sort instances by specified field(s). Use '-' prefix for descending order (e.g., '-price'). Multiple sort fields can be comma-separated (e.g., '-price,mem'). Supported fields: price, mem, cpu, spotprice, gpu_core, gpu_mem.", "required": false, "schema": { "type": "string" }, "examples": { "ascending": { "value": "price", "description": "Sort by price ascending" }, "descending": { "value": "-price", "description": "Sort by price descending" }, "multiple": { "value": "-price,mem", "description": "Sort by price descending, then by memory" } }, "index$": 1 }, { "name": "json", "in": "query", "description": "Alternative method to request JSON response format instead of using Accept header", "required": false, "schema": { "type": "string", "enum": [""] }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_instance_pricing_ref01_data = Object.values(setup.data.existing.get_instance_pricing)[0];
        // LIST
        const get_instance_pricing_ref01_ent = client.GetInstancePricing();
        const get_instance_pricing_ref01_match = {};
        const get_instance_pricing_ref01_list = (await get_instance_pricing_ref01_ent.list(get_instance_pricing_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_instance_pricing/GetInstancePricingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Ec2ShopSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_instance_pricing01', 'get_instance_pricing02', 'get_instance_pricing03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EC2_SHOP_TEST_GET_INSTANCE_PRICING_ENTID': idmap,
        'EC2_SHOP_TEST_LIVE': 'FALSE',
        'EC2_SHOP_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['EC2_SHOP_TEST_GET_INSTANCE_PRICING_ENTID'];
    const live = 'TRUE' === env.EC2_SHOP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EC2_SHOP_TEST_GET_INSTANCE_PRICING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.Ec2ShopSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.EC2_SHOP_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GetInstancePricingEntity.test.js.map