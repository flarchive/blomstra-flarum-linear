<?php

namespace Blomstra\Linear\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class LinearTeamsSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($teams)
    {
        return $teams;
    }

    /**
     * {@inheritdoc}
     */
    public function getType($teams)
    {
        return 'linear-teams';
    }

    /**
     * {@inheritdoc}
     */
    public function getId($teams)
    {
        return null;
    }

}
