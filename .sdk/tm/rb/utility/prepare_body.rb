# Ec2Shop SDK utility: prepare_body
require_relative 'media'
module Ec2ShopUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return Ec2ShopUtilities.raw_body(ctx.reqdata) if Ec2ShopUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
