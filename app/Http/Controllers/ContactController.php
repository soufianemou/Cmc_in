<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);
        Contact::create($request->all());
        return response()->json(['message' => 'We recieved your message Thank you for contacting Us.'], 201);
    }
}
