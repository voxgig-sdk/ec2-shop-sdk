# Ec2Shop SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module Ec2ShopFeatures
  def self.make_feature(name)
    case name
    when "base"
      Ec2ShopBaseFeature.new
    when "test"
      Ec2ShopTestFeature.new
    else
      Ec2ShopBaseFeature.new
    end
  end
end
