# Ec2Shop SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

Ec2ShopUtility.registrar = ->(u) {
  u.clean = Ec2ShopUtilities::Clean
  u.done = Ec2ShopUtilities::Done
  u.make_error = Ec2ShopUtilities::MakeError
  u.feature_add = Ec2ShopUtilities::FeatureAdd
  u.feature_hook = Ec2ShopUtilities::FeatureHook
  u.feature_init = Ec2ShopUtilities::FeatureInit
  u.fetcher = Ec2ShopUtilities::Fetcher
  u.make_fetch_def = Ec2ShopUtilities::MakeFetchDef
  u.make_context = Ec2ShopUtilities::MakeContext
  u.make_options = Ec2ShopUtilities::MakeOptions
  u.make_request = Ec2ShopUtilities::MakeRequest
  u.make_response = Ec2ShopUtilities::MakeResponse
  u.make_result = Ec2ShopUtilities::MakeResult
  u.make_point = Ec2ShopUtilities::MakePoint
  u.make_spec = Ec2ShopUtilities::MakeSpec
  u.make_url = Ec2ShopUtilities::MakeUrl
  u.param = Ec2ShopUtilities::Param
  u.prepare_auth = Ec2ShopUtilities::PrepareAuth
  u.prepare_body = Ec2ShopUtilities::PrepareBody
  u.prepare_headers = Ec2ShopUtilities::PrepareHeaders
  u.prepare_method = Ec2ShopUtilities::PrepareMethod
  u.prepare_params = Ec2ShopUtilities::PrepareParams
  u.prepare_path = Ec2ShopUtilities::PreparePath
  u.prepare_query = Ec2ShopUtilities::PrepareQuery
  u.result_basic = Ec2ShopUtilities::ResultBasic
  u.result_body = Ec2ShopUtilities::ResultBody
  u.result_headers = Ec2ShopUtilities::ResultHeaders
  u.transform_request = Ec2ShopUtilities::TransformRequest
  u.transform_response = Ec2ShopUtilities::TransformResponse
}
