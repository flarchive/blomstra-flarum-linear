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

use Blomstra\Linear\Controllers\ListPrioritiesController;
use Blomstra\Linear\Controllers\ListTeamsController;
use Blomstra\Linear\Controllers\CreateLinearIssueController;
use Blomstra\Linear\Providers\LinearIssuesServiceProvider;
use Blomstra\Linear\Providers\LinearTeamsServiceProvider;
use Blomstra\Linear\Providers\LinearPrioritiesServiceProvider;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/linear/teams', 'teams.list', ListTeamsController::class)
        ->get('/linear/priorities', 'priorities.list', ListPrioritiesController::class)
        ->post('/linear/issues', 'issues.create', CreateLinearIssueController::class),


    (new Extend\ServiceProvider())
        ->register(LinearTeamsServiceProvider::class)
        ->register(LinearPrioritiesServiceProvider::class)
        ->register(LinearIssuesServiceProvider::class),


    (new Extend\Settings)
        ->serializeToForum('blomstraLinearDefaultTeamId', 'blomstra-linear.default-team'),

    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->attribute('linearIssueId', function (DiscussionSerializer $serializer, Discussion $discussion, array $attributes) {
            return $discussion->linear_issue_id;
        })
        ->attribute('canAddToLinear', function (DiscussionSerializer $serializer, Discussion $discussion, array $attributes) {
            return (bool) $serializer->getActor()->can('addToLinear', $discussion);
        }),
];
