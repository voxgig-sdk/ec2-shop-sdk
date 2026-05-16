<?php
declare(strict_types=1);

// Ec2Shop SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class Ec2ShopMakeContext
{
    public static function call(array $ctxmap, ?Ec2ShopContext $basectx): Ec2ShopContext
    {
        return new Ec2ShopContext($ctxmap, $basectx);
    }
}
