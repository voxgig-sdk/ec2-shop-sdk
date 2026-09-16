

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"float","name":"Cost","req":true,"short":"Hourly cost for on-demand Linux instance in USD","type":"`$NUMBER`","index$":0},{"active":true,"name":"InstanceType","req":true,"short":"The EC2 instance type (e.g., 't2.micro', 'm5.large')","type":"`$STRING`","index$":1},{"active":true,"name":"Memory","req":true,"short":"Amount of memory available in GiB","type":"`$STRING`","index$":2},{"active":true,"format":"float","name":"MonthlyPrice","req":true,"short":"Estimated monthly cost in USD (Cost * 730 hours)","type":"`$NUMBER`","index$":3},{"active":true,"name":"Network","req":true,"short":"Network performance capability","type":"`$STRING`","index$":4},{"active":true,"name":"SpotPrice","req":true,"short":"Current spot instance hourly price in USD, or 'NA' if not available for spot pricing","type":"`$STRING`","index$":5},{"active":true,"name":"Storage","req":true,"short":"Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')","type":"`$STRING`","index$":6},{"active":true,"name":"VCPUS","req":true,"short":"Number of virtual CPUs","type":"`$INTEGER`","index$":7}],"name":"get_instance_pricing","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"i3","kind":"query","name":"filter","orig":"filter","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"json","orig":"json","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"price","kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /","json":"{\"operationId\":\"getInstancePricing\",\"parameters\":[{\"description\":\"Filter instances by various criteria. Supports instance types (e.g., 't2.medium'), storage types (e.g., 'ssd'), and comparison expressions (e.g., 'mem>=32', 'cpu<=4', 'price<0.1', 'spotprice>0.05', 'gpu_core>=1', 'gpu_mem>=8'). Multiple filters can be comma-separated. Use '-' prefix to exclude (e.g., '-t3').\",\"examples\":{\"advancedFilter\":{\"description\":\"Advanced filter with multiple criteria\",\"value\":\"ssd,mem>=32,mem<=64,cpu>=2,cpu<=4\"},\"excludeFilter\":{\"description\":\"Exclude t3 instances with additional criteria\",\"value\":\"-t3,price<0.1,mem>=2\"},\"instanceType\":{\"description\":\"Filter for i3 instance types\",\"value\":\"i3\"},\"multipleTypes\":{\"description\":\"Filter for specific instance types\",\"value\":\"t2.medium,t3.medium\"},\"storageType\":{\"description\":\"Filter for instances with SSD storage\",\"value\":\"ssd\"}},\"in\":\"query\",\"name\":\"filter\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Sort instances by specified field(s). Use '-' prefix for descending order (e.g., '-price'). Multiple sort fields can be comma-separated (e.g., '-price,mem'). Supported fields: price, mem, cpu, spotprice, gpu_core, gpu_mem.\",\"examples\":{\"ascending\":{\"description\":\"Sort by price ascending\",\"value\":\"price\"},\"descending\":{\"description\":\"Sort by price descending\",\"value\":\"-price\"},\"multiple\":{\"description\":\"Sort by price descending, then by memory\",\"value\":\"-price,mem\"}},\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Alternative method to request JSON response format instead of using Accept header\",\"in\":\"query\",\"name\":\"json\",\"required\":false,\"schema\":{\"enum\":[\"\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"instanceList\":{\"value\":[{\"Cost\":0.333,\"InstanceType\":\"r3.xlarge\",\"Memory\":\"30.5 GiB\",\"MonthlyPrice\":243.09,\"Network\":\"Moderate\",\"SpotPrice\":\"0.0650\",\"Storage\":\"1 x 80 SSD\",\"VCPUS\":4},{\"Cost\":0.192,\"InstanceType\":\"m5.xlarge\",\"Memory\":\"16 GiB\",\"MonthlyPrice\":140.16,\"Network\":\"Up to 10 Gigabit\",\"SpotPrice\":\"0.0806\",\"Storage\":\"EBS only\",\"VCPUS\":4}]}},\"schema\":{\"items\":{\"description\":\"EC2 instance pricing information\",\"properties\":{\"Cost\":{\"description\":\"Hourly cost for on-demand Linux instance in USD\",\"example\":0.333,\"format\":\"float\",\"type\":\"number\"},\"InstanceType\":{\"description\":\"The EC2 instance type (e.g., 't2.micro', 'm5.large')\",\"example\":\"r3.xlarge\",\"type\":\"string\"},\"Memory\":{\"description\":\"Amount of memory available in GiB\",\"example\":\"30.5 GiB\",\"type\":\"string\"},\"MonthlyPrice\":{\"description\":\"Estimated monthly cost in USD (Cost * 730 hours)\",\"example\":243.09,\"format\":\"float\",\"type\":\"number\"},\"Network\":{\"description\":\"Network performance capability\",\"example\":\"Moderate\",\"type\":\"string\"},\"SpotPrice\":{\"description\":\"Current spot instance hourly price in USD, or 'NA' if not available for spot pricing\",\"example\":\"0.0650\",\"type\":\"string\"},\"Storage\":{\"description\":\"Storage type and capacity (e.g., 'EBS only', '1 x 80 SSD')\",\"example\":\"1 x 80 SSD\",\"type\":\"string\"},\"VCPUS\":{\"description\":\"Number of virtual CPUs\",\"example\":4,\"type\":\"integer\"}},\"required\":[\"InstanceType\",\"Memory\",\"VCPUS\",\"Storage\",\"Network\",\"Cost\",\"MonthlyPrice\",\"SpotPrice\"],\"type\":\"object\"},\"type\":\"array\"}},\"text/plain\":{\"example\":\"Instance Type    Memory       vCPUs        Storage              Network              Price    Monthly  Spot Price\\nc5d.9xlarge      72 GiB       36 vCPUs     1 x 900 NVMe SSD     10 Gigabit           1.7280   1261.440 0.7175\\nm5dn.24xlarge    384 GiB      96 vCPUs     4 x 900 NVMe SSD     100 Gigabit          6.5280   4765.440 1.6323\\nm6g.large        8 GiB        2 vCPUs      EBS only             Up to 10 Gigabit     0.0770   56.210   0.0357\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response with instance pricing data\",\"headers\":{\"Cache-Control\":{\"description\":\"Cache control header\",\"schema\":{\"type\":\"string\"}}}},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid filter or sort parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/","segments":[],"select":{"exist":["filter","json","sort"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_instance_pricing","name__orig":"get_instance_pricing","Name":"GetInstancePricing","name_":"get_instance_pricing","name-":"get-instance-pricing","NAME":"GET_INSTANCE_PRICING","index$":0}, {"active":true,"entity":"get_instance_pricing","key$":"BasicGetInstancePricingFlow","kind":"basic","name":"BasicGetInstancePricingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_instance_pricing_ref01"}}],"index$":0}]}, 'GetInstancePricing')
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
  
