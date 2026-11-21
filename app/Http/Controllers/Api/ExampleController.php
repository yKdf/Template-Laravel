<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ExampleService;
use Illuminate\Http\JsonResponse;

class ExampleController extends Controller
{
    public function __construct(private readonly ExampleService $service)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->service->list()]);
    }
}
