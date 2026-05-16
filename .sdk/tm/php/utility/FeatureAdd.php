<?php
declare(strict_types=1);

// Ec2Shop SDK utility: feature_add

class Ec2ShopFeatureAdd
{
    public static function call(Ec2ShopContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
