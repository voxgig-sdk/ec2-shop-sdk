# Ec2Shop SDK utility: make_context

from core.context import Ec2ShopContext


def make_context_util(ctxmap, basectx):
    return Ec2ShopContext(ctxmap, basectx)
