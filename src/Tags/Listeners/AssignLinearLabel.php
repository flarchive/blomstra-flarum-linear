<?php

namespace Blomstra\Linear\Tags\Listeners;

use Flarum\Tags\Event\Saving;

class AssignLinearLabel
{
    public function handle (Saving $event)
    {
        $event->tag->linear_label_id = data_get($event->data, 'attributes.linearLabelId', null);
    }
}