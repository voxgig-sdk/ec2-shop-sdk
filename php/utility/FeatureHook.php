<?php
declare(strict_types=1);

// Ec2Shop SDK utility: feature_hook

class Ec2ShopFeatureHook
{
    public static function call(Ec2ShopContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
