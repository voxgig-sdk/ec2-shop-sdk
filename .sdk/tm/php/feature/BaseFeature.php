<?php
declare(strict_types=1);

// Ec2Shop SDK base feature

class Ec2ShopBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(Ec2ShopContext $ctx, array $options): void {}
    public function PostConstruct(Ec2ShopContext $ctx): void {}
    public function PostConstructEntity(Ec2ShopContext $ctx): void {}
    public function SetData(Ec2ShopContext $ctx): void {}
    public function GetData(Ec2ShopContext $ctx): void {}
    public function GetMatch(Ec2ShopContext $ctx): void {}
    public function SetMatch(Ec2ShopContext $ctx): void {}
    public function PrePoint(Ec2ShopContext $ctx): void {}
    public function PreSpec(Ec2ShopContext $ctx): void {}
    public function PreRequest(Ec2ShopContext $ctx): void {}
    public function PreResponse(Ec2ShopContext $ctx): void {}
    public function PreResult(Ec2ShopContext $ctx): void {}
    public function PreDone(Ec2ShopContext $ctx): void {}
    public function PreUnexpected(Ec2ShopContext $ctx): void {}
}
