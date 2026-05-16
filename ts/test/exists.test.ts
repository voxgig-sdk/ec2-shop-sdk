
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Ec2ShopSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await Ec2ShopSDK.test()
    equal(null !== testsdk, true)
  })

})
