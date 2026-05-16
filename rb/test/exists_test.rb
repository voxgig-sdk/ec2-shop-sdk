# Ec2Shop SDK exists test

require "minitest/autorun"
require_relative "../Ec2Shop_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = Ec2ShopSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
