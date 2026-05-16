<?php
declare(strict_types=1);

// Ec2Shop SDK exists test

require_once __DIR__ . '/../ec2shop_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = Ec2ShopSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
