<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TestEmailController extends Controller
{
    public function sendTestEmail()
    {
        $details = [
            'title' => 'Test Email from Laravel',
            'body' => 'This is a test email sent using Gmail SMTP server.'
        ];

        Mail::raw('This is a test email sent using Gmail SMTP server.', function ($message) {
            $message->to('wesamalaa153@gmail.com')
                    ->subject('Test Email from Laravel');
        });

        return 'Email sent successfully!';
    }
}

