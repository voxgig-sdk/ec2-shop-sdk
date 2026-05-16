# ProjectName SDK exists test

import pytest
from ec2shop_sdk import Ec2ShopSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = Ec2ShopSDK.test(None, None)
        assert testsdk is not None
