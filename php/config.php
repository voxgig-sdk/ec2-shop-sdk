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
                "slug" => "ec2-shop",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'format' => 'float',
              'name' => 'Cost',
              'req' => true,
              'short' => 'Hourly cost for on-demand Linux instance in USD',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'InstanceType',
              'req' => true,
              'short' => 'The EC2 instance type (e.g., \'t2.micro\', \'m5.large\')',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'Memory',
              'req' => true,
              'short' => 'Amount of memory available in GiB',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'float',
              'name' => 'MonthlyPrice',
              'req' => true,
              'short' => 'Estimated monthly cost in USD (Cost * 730 hours)',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'Network',
              'req' => true,
              'short' => 'Network performance capability',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'SpotPrice',
              'req' => true,
              'short' => 'Current spot instance hourly price in USD, or \'NA\' if not available for spot pricing',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'Storage',
              'req' => true,
              'short' => 'Storage type and capacity (e.g., \'EBS only\', \'1 x 80 SSD\')',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'VCPUS',
              'req' => true,
              'short' => 'Number of virtual CPUs',
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
                  'segments' => [],
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
                  'parts' => [],
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
