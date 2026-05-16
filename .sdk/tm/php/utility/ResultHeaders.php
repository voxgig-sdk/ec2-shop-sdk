<?php
declare(strict_types=1);

// Ec2Shop SDK utility: result_headers

class Ec2ShopResultHeaders
{
    public static function call(Ec2ShopContext $ctx): ?Ec2ShopResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
