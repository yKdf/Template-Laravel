<?php

namespace App\Repositories;

class ExampleRepository
{
    public function all(): array
    {
        return [
            ['id' => 1, 'name' => 'Primeiro recurso'],
        ];
    }
}
