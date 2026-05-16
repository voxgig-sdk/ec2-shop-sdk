<?php
declare(strict_types=1);

// Ec2Shop SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class Ec2ShopFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Ec2ShopBaseFeature();
            case "test":
                return new Ec2ShopTestFeature();
            default:
                return new Ec2ShopBaseFeature();
        }
    }
}
