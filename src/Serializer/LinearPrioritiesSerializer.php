<?php

namespace Blomstra\Linear\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Linear\Dto\Priorities;
class LinearPrioritiesSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($priorities)
    {
        /**
         * @var Priorities $priorities
         */
        return $priorities->issuePriorityValues;
    }

    /**
     * {@inheritdoc}
     */
    public function getType($priorities)
    {
        return 'linear-priorities';
    }

    /**
     * {@inheritdoc}
     */
    public function getId($priorities)
    {
        return null;
    }

}
