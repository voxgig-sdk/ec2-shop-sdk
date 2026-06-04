<?php
declare(strict_types=1);

// Ec2Shop SDK configuration

class Ec2ShopConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Ec2Shop",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://ec2.shop",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_instance_pricing" => [],
                ],
            ],
            "entity" => [
        'get_instance_pricing' => [
          'fields' => [
            [
              'name' => 'cost',
              'req' => true,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'instance_type',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'memory',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'monthly_price',
              'req' => true,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'network',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'spot_price',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'storage',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 6,
            ],
            [
              'name' => 'vcpus',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 7,
            ],
          ],
          'name' => 'get_instance_pricing',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'i3',
                        'kind' => 'query',
                        'name' => 'filter',
                        'orig' => 'filter',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'json',
                        'orig' => 'json',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'price',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/',
                  'select' => [
                    'exist' => [
                      'filter',
                      'json',
                      'sort',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'parts' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return Ec2ShopFeatures::make_feature($name);
    }
}
