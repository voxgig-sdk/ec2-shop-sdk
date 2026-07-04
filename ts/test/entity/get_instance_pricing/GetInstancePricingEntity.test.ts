
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { Ec2ShopSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('GetInstancePricingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EC2SHOP_TEST_LIVE=TRUE.
  afterEach(liveDelay('EC2SHOP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Ec2ShopSDK.test()
    const ent = testsdk.GetInstancePricing()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EC__SHOP_TEST_LIVE
    for (const op of ['list']) {
      if (maybeSkipControl(t, 'entityOp', 'get_instance_pricing.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set EC__SHOP_TEST_GET_INSTANCE_PRICING_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_instance_pricing_ref01_data = Object.values(setup.data.existing.get_instance_pricing)[0] as any

    // LIST
    const get_instance_pricing_ref01_ent = client.GetInstancePricing()
    const get_instance_pricing_ref01_match: any = {}

    const get_instance_pricing_ref01_list = await get_instance_pricing_ref01_ent.list(get_instance_pricing_ref01_match)


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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['EC__SHOP_TEST_GET_INSTANCE_PRICING_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'EC__SHOP_TEST_GET_INSTANCE_PRICING_ENTID': idmap,
    'EC__SHOP_TEST_LIVE': 'FALSE',
    'EC__SHOP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['EC__SHOP_TEST_GET_INSTANCE_PRICING_ENTID']

  const live = 'TRUE' === env.EC__SHOP_TEST_LIVE

  if (live) {
    client = new Ec2ShopSDK(merge([
      {
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.EC__SHOP_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
