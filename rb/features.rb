# Ec2Shop SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module Ec2ShopFeatures
  def self.make_feature(name)
    case name
    when "base"
      Ec2ShopBaseFeature.new
    when "ratelimit"
      Ec2ShopRatelimitFeature.new
    when "retry"
      Ec2ShopRetryFeature.new
    when "test"
      Ec2ShopTestFeature.new
    when "timeout"
      Ec2ShopTimeoutFeature.new
    else
      Ec2ShopBaseFeature.new
    end
  end
end
