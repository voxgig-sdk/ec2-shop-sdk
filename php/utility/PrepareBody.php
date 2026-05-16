<?php
declare(strict_types=1);

// Ec2Shop SDK utility: prepare_body

class Ec2ShopPrepareBody
{
    public static function call(Ec2ShopContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
