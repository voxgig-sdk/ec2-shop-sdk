package voxgigec2shopsdk

import (
	"github.com/voxgig-sdk/ec2-shop-sdk/go/core"
	"github.com/voxgig-sdk/ec2-shop-sdk/go/entity"
	"github.com/voxgig-sdk/ec2-shop-sdk/go/feature"
	_ "github.com/voxgig-sdk/ec2-shop-sdk/go/utility"
)

// Type aliases preserve external API.
type Ec2ShopSDK = core.Ec2ShopSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type Ec2ShopEntity = core.Ec2ShopEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type Ec2ShopError = core.Ec2ShopError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetInstancePricingEntityFunc = func(client *core.Ec2ShopSDK, entopts map[string]any) core.Ec2ShopEntity {
		return entity.NewGetInstancePricingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewEc2ShopSDK = core.NewEc2ShopSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewEc2ShopSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *Ec2ShopSDK  { return NewEc2ShopSDK(nil) }
func Test() *Ec2ShopSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
