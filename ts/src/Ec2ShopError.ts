
import { Context } from './Context'


class Ec2ShopError extends Error {

  isEc2ShopError = true

  sdk = 'Ec2Shop'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  Ec2ShopError
}

