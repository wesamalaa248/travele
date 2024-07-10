<?php

use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;

Route::get('/send-test-email', function () {
    $contact = App\Models\Contact::find(1); // Replace with your logic to fetch a contact
    Mail::to('wesamalaa153@gmail.com')->send(new ContactMail($contact));

    return 'Test email sent successfully!';
});
