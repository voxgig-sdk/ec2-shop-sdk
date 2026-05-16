# Ec2Shop SDK utility: prepare_body
module Ec2ShopUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
