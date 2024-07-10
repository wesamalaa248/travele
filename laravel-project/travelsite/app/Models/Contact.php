<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Mail\ContactMail;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class Contact extends Model
{
    protected $fillable = ['name', 'email', 'message'];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($contact) {
            Log::info('Contact created: ' . $contact->id);

            try {
                Mail::to('wesamalaa153@gmail.com')->send(new ContactMail($contact));
                Log::info('Email sent successfully.');
            } catch (\Exception $e) {
                Log::error('Error sending email: ' . $e->getMessage());
            }
        });
    }
}
