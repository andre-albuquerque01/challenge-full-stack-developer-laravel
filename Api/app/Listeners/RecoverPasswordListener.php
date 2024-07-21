<?php

namespace App\Listeners;

use App\Events\SendEmailRecoverPasswordEvent;
use App\Mail\RecoverPassword;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class RecoverPasswordListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SendEmailRecoverPasswordEvent $event): void
    {
        Mail::to($event->email)->send(new RecoverPassword([
            'toEmail' => $event->email,
            'subject' => 'Recuperação de senha',
            'token' => $event->token
        ]));
    }
}
