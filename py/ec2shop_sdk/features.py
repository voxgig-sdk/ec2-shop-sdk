# Ec2Shop SDK feature factory

from ec2shop_sdk.feature.base_feature import Ec2ShopBaseFeature
from ec2shop_sdk.feature.test_feature import Ec2ShopTestFeature


def _make_feature(name):
    features = {
        "base": lambda: Ec2ShopBaseFeature(),
        "test": lambda: Ec2ShopTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
