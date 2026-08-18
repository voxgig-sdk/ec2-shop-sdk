<?php
declare(strict_types=1);

// Ec2Shop SDK configuration

class Ec2ShopConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
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
              'name' => 'Cost',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'InstanceType',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'Memory',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'MonthlyPrice',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'Network',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'SpotPrice',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'Storage',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'VCPUS',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'get_instance_pricing',
          'op' => [
            'list' => [
              'input' => 'data',
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
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'json',
                        'orig' => 'json',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'price',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'parts' => [],
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
                ],
              ],
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
