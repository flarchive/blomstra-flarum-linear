<?php

namespace Blomstra\Linear\Controllers;

use Flarum\Settings\SettingsRepositoryInterface;
use Linear\Sdk\Priorities;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Psr\Log\LoggerInterface;
use Tobscure\JsonApi\Document;
use Flarum\Http\RequestUtil;
use Flarum\Api\Controller\AbstractShowController;
use Blomstra\Linear\Serializer\LinearPrioritiesSerializer;


class ListPrioritiesController extends AbstractShowController
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @var LoggerInterface
     */

    protected $logger;

    /**
     * {@inheritdoc}
     */
    public $serializer = LinearPrioritiesSerializer::class;

    /**
     * @var Priorities
     */
    protected $client;
    public function __construct(SettingsRepositoryInterface $settings, TranslatorInterface $translator, LoggerInterface $logger, Priorities $client)
    {
        $this->settings = $settings;
        $this->translator = $translator;
        $this->logger = $logger;
        $this->client = $client;
    }

    public function data(ServerRequestInterface $request, Document $document)
    {
        $u = RequestUtil::getActor($request);
        $u->assertPermission($u->hasPermission('discussion.addToLinear'));

        if (!$this->client) {
            $this->logger->error('Linear API client not configured');

            return [];
        }

        return $this->client->get();

    }

}


