<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('app:hello', function (): void {
    $this->info('O template está funcionando.');
})->purpose('Verifica o carregamento da aplicação');
