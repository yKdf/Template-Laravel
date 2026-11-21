<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Vincule interfaces às implementações aqui.
    }

    public function boot(): void
    {
        // Inicialização global da aplicação.
    }
}
