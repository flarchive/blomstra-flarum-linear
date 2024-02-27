<?php

/*
 * This file is part of blomstra/flarum-linear.
 *
 * Copyright (c) Blomstra.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Blomstra\Linear;

use Blomstra\Linear\Controllers\ListLabelsController;
use Blomstra\Linear\Controllers\ListPrioritiesController;
use Blomstra\Linear\Controllers\ListTeamsController;
use Blomstra\Linear\Controllers\CreateLinearIssueController;
use Blomstra\Linear\Providers\LinearIssuesServiceProvider;
use Blomstra\Linear\Providers\LinearLabelsServiceProvider;
use Blomstra\Linear\Providers\LinearTeamsServiceProvider;
use Blomstra\Linear\Providers\LinearPrioritiesServiceProvider;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Tags\Tag;
use Flarum\Tags\Event\Saving as TagSaving;
use Flarum\Discussion\Discussion;
use Flarum\Extend;

return [
    (new Extend\Event)
        ->listen(TagSaving::class, Tags\Listeners\AssignLinearLabel::class),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/linear/teams', 'teams.list', ListTeamsController::class)
        ->get('/linear/priorities', 'priorities.list', ListPrioritiesController::class)
        ->post('/linear/issues', 'issues.create', CreateLinearIssueController::class)
        ->get('/linear/labels', 'labels.list', ListLabelsController::class),


    (new Extend\ServiceProvider())
        ->register(LinearTeamsServiceProvider::class)
        ->register(LinearPrioritiesServiceProvider::class)
        ->register(LinearLabelsServiceProvider::class)
        ->register(LinearIssuesServiceProvider::class),

    (new Extend\ApiSerializer(TagSerializer::class))
        ->attribute('linearLabelId', function (TagSerializer $serializer, Tag $tag, array $attributes) {
            return $tag->linear_label_id;
        }),

    (new Extend\Settings)
        ->serializeToForum('blomstraLinearDefaultTeamId', 'blomstra-linear.default-team')
        ->serializeToForum('blomstraLinearLastTeamId', 'blomstra-linear.last-team-id')
        ->serializeToForum('blomstraLinearLastPriority', 'blomstra-linear.last-priority'),

    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->attribute('linearIssueId', function (DiscussionSerializer $serializer, Discussion $discussion, array $attributes) {
            return $discussion->linear_issue_id;
        })
        ->attribute('canAddToLinear', function (DiscussionSerializer $serializer, Discussion $discussion, array $attributes) {
            return (bool) $serializer->getActor()->can('addToLinear', $discussion);
        }),
];
