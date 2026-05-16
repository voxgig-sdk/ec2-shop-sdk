package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetInstancePricingEntityFunc func(client *Ec2ShopSDK, entopts map[string]any) Ec2ShopEntity

