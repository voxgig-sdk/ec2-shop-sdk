<?php
declare(strict_types=1);

// Ec2Shop SDK utility: prepare_headers

class Ec2ShopPrepareHeaders
{
    public static function call(Ec2ShopContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
