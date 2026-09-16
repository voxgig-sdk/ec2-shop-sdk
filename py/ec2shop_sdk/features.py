# Ec2Shop SDK feature factory

from ec2shop_sdk.feature.base_feature import Ec2ShopBaseFeature
from ec2shop_sdk.feature.ratelimit_feature import Ec2ShopRatelimitFeature
from ec2shop_sdk.feature.retry_feature import Ec2ShopRetryFeature
from ec2shop_sdk.feature.test_feature import Ec2ShopTestFeature
from ec2shop_sdk.feature.timeout_feature import Ec2ShopTimeoutFeature


_FEATURES = {
    "base": lambda: Ec2ShopBaseFeature(),
    "ratelimit": lambda: Ec2ShopRatelimitFeature(),
    "retry": lambda: Ec2ShopRetryFeature(),
    "test": lambda: Ec2ShopTestFeature(),
    "timeout": lambda: Ec2ShopTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
