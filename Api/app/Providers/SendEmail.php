<?php

namespace App\Providers;

use App\Events\SendEmailRecoverPasswordEvent;
use App\Listeners\RecoverPasswordListener;
use Illuminate\Support\ServiceProvider;

class SendEmail extends ServiceProvider
{
    protected $listen = [
        SendEmailRecoverPasswordEvent::class => [
            RecoverPasswordListener::class
        ],
    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
