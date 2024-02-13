<?php

namespace Blomstra\Linear\Controllers;

use Blomstra\Linear\Serializer\LinearTeamsSerializer;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Discussion\DiscussionRepository;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Flarum\Http\UrlGenerator;
use Linear\Sdk\Teams;
use Linear\Sdk\Priorities;
use Linear\Sdk\Issues;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Str;


class CreateLinearIssueController extends AbstractCreateController
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
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * {@inheritdoc}
     */
    public $serializer = LinearTeamsSerializer::class;

    /**
     * @var Teams
     */
    protected $teams;

    /**
     * @var Priorities
     */
    protected $priorities;

    /**
     * @var Issues
     */
    protected $issues;

    public function __construct(TranslatorInterface $translator, SettingsRepositoryInterface $settings, UrlGenerator $url, LoggerInterface $logger, Teams $teams, Priorities $priorities, Issues $issues)
    {
        $this->logger = $logger;
        $this->teams = $teams;
        $this->priorities = $priorities;
        $this->settings = $settings;
        $this->translator = $translator;
        $this->issues = $issues;
        $this->url = $url;
    }

    public function data(ServerRequestInterface $request, Document $document)
    {
        $u = RequestUtil::getActor($request);
        $u->assertPermission($u->hasPermission('discussion.addToLinear'));

        if (!$this->teams || !$this->priorities || !$this->issues) {
            $this->logger->error('Linear API clients not configured');

            return [];
        }

        $vars = $request->getParsedBody();

        if (!isset($vars['team']) || !$vars['discussion'] || !isset($vars['priority']) || !isset($vars['tags'])) {
            $this->logger->error('Missing data in Linear Issue Creation endpoint.');

            return [];
        }

        // Load Discussion
        $dr = new DiscussionRepository();
        $discussion = $dr->findOrFail($vars['discussion'], $u);

        $tags = [];

        foreach ($discussion->getAttribute('tags') as $tag) {
            $tags[] = $tag->getAttribute('name');
        }

        $priority = $vars['priority'];
        $username = $discussion->user->getAttribute('username');
        $userUrl = $this->url->to('forum')->route('user', ['username' => $username]);
        $title = $discussion->getAttribute('title');
        $postUrl = $this->url->to('forum')->route('discussion', ['id' => $discussion->id]);
        $header = $this->translator->trans('blomstra-linear.lib.original_post');
        $description = trim(Str::limit(
            "[$header]($postUrl) by [$username]($userUrl) \n\n" .
            $discussion->posts->first()->content . "\n\n" .
            "Tags: " . implode(', ', $tags)
            , 16380));

        $this->settings->set('blomstra-linear.last-team-id', $vars['team']);
        $this->settings->set('blomstra-linear.last-priority', $vars['priority']);

        $team = $this->teams->getOne($vars['team']);

        $issue = $this->issues->create($title, $description, $team, $priority);

        if ($issue->id) {
            // Update Database
            $discussion->setAttribute('linear_issue_id', $team->organization->urlKey . ':::' . $team->key . '-' . $issue->number);
            $discussion->update();

            return $team->organization->urlKey . ':::' . $team->key . '-' . $issue->number;
        }

        $this->logger->error('Linear API client failed to create issue.');

        return false;

    }

}


