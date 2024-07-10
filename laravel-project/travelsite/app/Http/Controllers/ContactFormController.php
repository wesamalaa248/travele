<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ContactFormRequest;
use Illuminate\Support\Facades\Mail;
use App\Models\Contact;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Log;

class ContactFormController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'message' => 'required|string',
            ]);

            $contact = Contact::create($request->all());

            // Send email
            Mail::to('wesamalaa153@gmail.com')->send(new ContactMail($contact));

            return response()->json(['message' => 'Thank you for contacting us. We will get back to you shortly.']);
        } catch (\Exception $e) {
            Log::error('Error storing contact: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred. Please try again later.'], 500);
        }
    }
public function show($id)
{
    $contact = Contact::find($id);

    if (!$contact) {
        dd("Contact with ID {$id} not found."); // Debug message
    }

    return view('contacts.show', compact('contact'));
}
}
