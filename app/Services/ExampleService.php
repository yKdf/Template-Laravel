<?php

namespace App\Services;

use App\Repositories\ExampleRepository;

class ExampleService
{
    public function __construct(private readonly ExampleRepository $repository)
    {
    }

    public function list(): array
    {
        return $this->repository->all();
    }
}
