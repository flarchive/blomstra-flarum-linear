<?php

/*
 * This file is part of blomstra/trello.
 *
 * Copyright (c) 2024 Blomstra Ltd.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Database\Migration;

return Migration::addColumns('tags', [
    'linear_label_id' => ['string', 'length' => 64, 'nullable' => true, 'default' => null],
]);
