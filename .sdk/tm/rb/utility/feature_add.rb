# Ec2Shop SDK utility: feature_add
module Ec2ShopUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
