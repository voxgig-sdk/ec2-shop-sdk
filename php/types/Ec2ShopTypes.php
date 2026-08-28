<?php
declare(strict_types=1);

// Typed models for the Ec2Shop SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetInstancePricing entity data model. */
class GetInstancePricing
{
    public float $Cost;
    public string $InstanceType;
    public string $Memory;
    public float $MonthlyPrice;
    public string $Network;
    public string $SpotPrice;
    public string $Storage;
    public int $VCPUS;
}

/** Request payload for GetInstancePricing#list. */
class GetInstancePricingListMatch
{
    public ?string $filter = null;
    public ?string $json = null;
    public ?string $sort = null;
}

