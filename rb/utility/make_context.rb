# Ec2Shop SDK utility: make_context
require_relative '../core/context'
module Ec2ShopUtilities
  MakeContext = ->(ctxmap, basectx) {
    Ec2ShopContext.new(ctxmap, basectx)
  }
end
