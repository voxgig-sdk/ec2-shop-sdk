
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Ec2ShopSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = Ec2ShopSDK.test()
    equal(testsdk instanceof Ec2ShopSDK, true,
      'Ec2ShopSDK.test() must return a client synchronously')
  })

})
