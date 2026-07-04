# Typed models for the Ec2Shop SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GetInstancePricing:
    cost: float
    instance_type: str
    memory: str
    monthly_price: float
    network: str
    spot_price: str
    storage: str
    vcpus: int


@dataclass
class GetInstancePricingListMatch:
    cost: Optional[float] = None
    instance_type: Optional[str] = None
    memory: Optional[str] = None
    monthly_price: Optional[float] = None
    network: Optional[str] = None
    spot_price: Optional[str] = None
    storage: Optional[str] = None
    vcpus: Optional[int] = None

