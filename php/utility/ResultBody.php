<?php
declare(strict_types=1);

// Ec2Shop SDK utility: result_body

class Ec2ShopResultBody
{
    public static function call(Ec2ShopContext $ctx): ?Ec2ShopResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
