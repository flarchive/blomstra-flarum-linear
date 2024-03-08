<?php

namespace Blomstra\Linear\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Linear\Dto\Issues;

class LinearIssuesSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($issues)
    {
        /**
         * @var Issues $issues
         */
        return $issues->nodes;
    }

    /**
     * {@inheritdoc}
     */
    public function getType($issues)
    {
        return 'linear-issues';
    }

    /**
     * {@inheritdoc}
     */
    public function getId($issues)
    {
        return null;
    }

}
