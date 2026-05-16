# Ec2Shop SDK feature factory

from feature.base_feature import Ec2ShopBaseFeature
from feature.test_feature import Ec2ShopTestFeature


def _make_feature(name):
    features = {
        "base": lambda: Ec2ShopBaseFeature(),
        "test": lambda: Ec2ShopTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
