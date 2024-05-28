<?php

namespace Blomstra\Linear\Controllers;

use Flarum\Settings\SettingsRepositoryInterface;
use Linear\Sdk\Labels;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Psr\Log\LoggerInterface;
use Tobscure\JsonApi\Document;
use Flarum\Http\RequestUtil;
use Flarum\Api\Controller\AbstractShowController;
use Blomstra\Linear\Serializer\LinearTeamsSerializer;


class ListLabelsController extends AbstractShowController
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
    public $serializer = LinearTeamsSerializer::class;

    /**
     * @var Labels
     */
    protected $labels;

    public function __construct(SettingsRepositoryInterface $settings, TranslatorInterface $translator, LoggerInterface $logger, Labels $labels)
    {
        $this->settings = $settings;
        $this->translator = $translator;
        $this->logger = $logger;
        $this->labels = $labels;
    }

    public function data(ServerRequestInterface $request, Document $document)
    {
        $u = RequestUtil::getActor($request);
        $u->assertPermission($u->hasPermission('discussion.addToLinear'));

        if (!$this->labels) {
            $this->logger->error('Linear API client not configured');

            return [];
        }

        return $this->labels->getWorkspaceLabels()->nodes;
    }
}


