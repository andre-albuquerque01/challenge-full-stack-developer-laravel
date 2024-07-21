<?php

namespace App\Jobs;

use App\Events\SendEmailRecoverPasswordEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendRecoverPasswordEmailJob implements ShouldQueue
{
    use Queueable;
    private string $email, $token;
    /**
     * Create a new job instance.
     */
    public function __construct(string $email, string $token)
    {
        $this->email = $email;
        $this->token = $token;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        event(new SendEmailRecoverPasswordEvent($this->email, $this->token));
    }
}
