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
    public float $cost;
    public string $instance_type;
    public string $memory;
    public float $monthly_price;
    public string $network;
    public string $spot_price;
    public string $storage;
    public int $vcpus;
}

/** Request payload for GetInstancePricing#list. */
class GetInstancePricingListMatch
{
    public ?float $cost = null;
    public ?string $instance_type = null;
    public ?string $memory = null;
    public ?float $monthly_price = null;
    public ?string $network = null;
    public ?string $spot_price = null;
    public ?string $storage = null;
    public ?int $vcpus = null;
}

