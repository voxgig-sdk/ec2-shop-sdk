

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Ec2ShopSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetInstancePricingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EC2_SHOP_TEST_LIVE=TRUE.
  afterEach(liveDelay('EC2_SHOP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Ec2ShopSDK.test()
    const ent = testsdk.GetInstancePricing()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EC2_SHOP_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_instance_pricing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Cost":{"a":true,"fo":"float","h":"Cost","n":"Cost","r":true,"sh":"Hourly cost for on-demand Linux instance in USD","t":"`$NUMBER`","key$":"Cost","index$":0},"InstanceType":{"a":true,"h":"Instance Type","n":"InstanceType","r":true,"sh":"The EC2 instance type (e.g., 't2.micro', 'm5.large')","t":"`$STRING`","key$":"InstanceType","index$":1},"Memory":{"a":true,"h":"Memory","n":"Memory","r":true,"sh":"Amount of memory available in GiB","t":"`$STRING`","key$":"Memory","index$":2},"MonthlyPrice":{"a":true,"fo":"float","h":"Monthly Price","n":"MonthlyPrice","r":true,"sh":"Estimated monthly cost in USD (Cost * 730 hours)","t":"`$NUMBER`","key$":"MonthlyPrice","index$":3},"Network":{"a":true,"h":"Network","n":"Network","r":true,"sh":"Network performance capability","t":"`$STRING`","key$":"Network","index$":4},"SpotPrice":{"a":true,"h":"Spot Price","n":"SpotPrice","r":true,"sh":"Current spot instance hourly price in USD, or 'NA' if not available for spot pricing","t":"`$STRING`","key$":"SpotPrice","index$":5},"Storage":{"a":true,"h":"Storage","n":"Storage","r":true,"sh":"Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')","t":"`$STRING`","key$":"Storage","index$":6},"VCPUS":{"a":true,"h":"Vcpus","n":"VCPUS","r":true,"sh":"Number of virtual CPUs","t":"`$INTEGER`","key$":"VCPUS","index$":7}},"name":"get_instance_pricing","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"i3","k":"query","n":"filter","or":"filter","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"json","or":"json","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"price","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/","q":{"exist":["filter","json","sort"]},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_instance_pricing","name__orig":"get_instance_pricing","Name":"GetInstancePricing","name_":"get_instance_pricing","name-":"get-instance-pricing","NAME":"GET_INSTANCE_PRICING","index$":0}, {"active":true,"entity":"get_instance_pricing","key$":"BasicGetInstancePricingFlow","kind":"basic","name":"BasicGetInstancePricingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_instance_pricing_ref01"}}],"index$":0}]}, 'GetInstancePricing', {"GET /":{"protocol":"http","operationId":"getInstancePricing","responses":{"200":{"description":"Successful response with instance pricing data","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"EC2 instance pricing information","properties":{"InstanceType":{"type":"string","description":"The EC2 instance type (e.g., 't2.micro', 'm5.large')","example":"r3.xlarge","key$":"InstanceType"},"Memory":{"type":"string","description":"Amount of memory available in GiB","example":"30.5 GiB","key$":"Memory"},"VCPUS":{"type":"integer","description":"Number of virtual CPUs","example":4,"key$":"VCPUS"},"Storage":{"type":"string","description":"Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')","example":"1 x 80 SSD","key$":"Storage"},"Network":{"type":"string","description":"Network performance capability","example":"Moderate","key$":"Network"},"Cost":{"type":"number","format":"float","description":"Hourly cost for on-demand Linux instance in USD","example":0.333,"key$":"Cost"},"MonthlyPrice":{"type":"number","format":"float","description":"Estimated monthly cost in USD (Cost * 730 hours)","example":243.09,"key$":"MonthlyPrice"},"SpotPrice":{"type":"string","description":"Current spot instance hourly price in USD, or 'NA' if not available for spot pricing","example":"0.0650","key$":"SpotPrice"}},"required":["InstanceType","Memory","VCPUS","Storage","Network","Cost","MonthlyPrice","SpotPrice"],"x-ref":"#/components/schemas/InstancePricing","index$":0}},"examples":{"instanceList":{"value":[{"InstanceType":"r3.xlarge","Memory":"30.5 GiB","VCPUS":4,"Storage":"1 x 80 SSD","Network":"Moderate","Cost":0.333,"MonthlyPrice":243.09,"SpotPrice":"0.0650"},{"InstanceType":"m5.xlarge","Memory":"16 GiB","VCPUS":4,"Storage":"EBS only","Network":"Up to 10 Gigabit","Cost":0.192,"MonthlyPrice":140.16,"SpotPrice":"0.0806"}]}}},"text/plain":{"schema":{"type":"string"},"example":"Instance Type    Memory       vCPUs        Storage              Network              Price    Monthly  Spot Price\nc5d.9xlarge      72 GiB       36 vCPUs     1 x 900 NVMe SSD     10 Gigabit           1.7280   1261.440 0.7175\nm5dn.24xlarge    384 GiB      96 vCPUs     4 x 900 NVMe SSD     100 Gigabit          6.5280   4765.440 1.6323\nm6g.large        8 GiB        2 vCPUs      EBS only             Up to 10 Gigabit     0.0770   56.210   0.0357"}},"headers":{"Cache-Control":{"description":"Cache control header","schema":{"type":"string"}}}},"400":{"description":"Bad request - invalid filter or sort parameters","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"filter","in":"query","description":"Filter instances by various criteria. Supports instance types (e.g., 't2.medium'), storage types (e.g., 'ssd'), and comparison expressions (e.g., 'mem>=32', 'cpu<=4', 'price<0.1', 'spotprice>0.05', 'gpu_core>=1', 'gpu_mem>=8'). Multiple filters can be comma-separated. Use '-' prefix to exclude (e.g., '-t3').","required":false,"schema":{"type":"string"},"examples":{"instanceType":{"value":"i3","description":"Filter for i3 instance types"},"storageType":{"value":"ssd","description":"Filter for instances with SSD storage"},"multipleTypes":{"value":"t2.medium,t3.medium","description":"Filter for specific instance types"},"advancedFilter":{"value":"ssd,mem>=32,mem<=64,cpu>=2,cpu<=4","description":"Advanced filter with multiple criteria"},"excludeFilter":{"value":"-t3,price<0.1,mem>=2","description":"Exclude t3 instances with additional criteria"}},"index$":0},{"name":"sort","in":"query","description":"Sort instances by specified field(s). Use '-' prefix for descending order (e.g., '-price'). Multiple sort fields can be comma-separated (e.g., '-price,mem'). Supported fields: price, mem, cpu, spotprice, gpu_core, gpu_mem.","required":false,"schema":{"type":"string"},"examples":{"ascending":{"value":"price","description":"Sort by price ascending"},"descending":{"value":"-price","description":"Sort by price descending"},"multiple":{"value":"-price,mem","description":"Sort by price descending, then by memory"}},"index$":1},{"name":"json","in":"query","description":"Alternative method to request JSON response format instead of using Accept header","required":false,"schema":{"type":"string","enum":[""]},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_instance_pricing_ref01_data = Object.values(setup.data.existing.get_instance_pricing)[0] as any

    // LIST
    const get_instance_pricing_ref01_ent = client.GetInstancePricing()
    const get_instance_pricing_ref01_match: any = {}

    const get_instance_pricing_ref01_list = (await get_instance_pricing_ref01_ent.list(get_instance_pricing_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_instance_pricing/GetInstancePricingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = Ec2ShopSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_instance_pricing01','get_instance_pricing02','get_instance_pricing03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EC2_SHOP_TEST_GET_INSTANCE_PRICING_ENTID': idmap,
    'EC2_SHOP_TEST_LIVE': 'FALSE',
    'EC2_SHOP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['EC2_SHOP_TEST_GET_INSTANCE_PRICING_ENTID']

  const live = 'TRUE' === env.EC2_SHOP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EC2_SHOP_TEST_GET_INSTANCE_PRICING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new Ec2ShopSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
