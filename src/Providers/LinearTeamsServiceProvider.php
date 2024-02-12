<?php

namespace Blomstra\Linear\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;
use Linear\Sdk\Teams;

class LinearTeamsServiceProvider extends AbstractServiceProvider
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        parent::__construct($container);
    }

    public function register()
    {
        $this->container->singleton('blomstra.linear.teams.client', function ($container) {
            $settings = $container->make(SettingsRepositoryInterface::class);

            $apiToken = $settings->get('blomstra-linear.token');
            $cacheTtl = empty($settings->get('blomstra-linear.cachettl')) ? 0 : $settings->get('blomstra-linear.cachettl');

            if (empty($apiToken)) {
                return null;
            }

            return new Teams($apiToken, $cacheTtl, storage_path('cache/linear'));
        });

        $this->container->alias('blomstra.linear.teams.client', Teams::class);
    }
}
