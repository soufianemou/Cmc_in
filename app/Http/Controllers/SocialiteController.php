<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();
        $findUser = User::where('email', $user->email)->first();
            if (!$findUser) {
                $findUser = Admin::where('email', $user->email)->first();
            }
        if($findUser){
            // Check if the user has a password set
            if (!empty($findUser->password)) {
                return response()->json([
                    'message' => 'This account is already registered with a password',
                ], 403); // Forbidden
            }
            // $request->session()->regenerate();
            Auth::login($findUser);
            return response([
                'user'=>$findUser,
                'token' => $findUser->createToken('api',[$findUser->getRoleAttribute()])->plainTextToken,
                'message' => 'connected successfully'
            ]);
        }else{
            $nameParts = explode(' ', $user->name);
            $newUser = User::create([
                'name' => $nameParts[0],
                'lname' => end($nameParts),
                'email' => $user->email,
                'email_verified_at' => now(),
                'image'=>'user/user.jpg',
                'social_id'=> $user->id,
                'social_type'=> 'google',
            ]);
            event(new Registered($newUser));
            // $request->session()->regenerate();
            Auth::login($newUser);
            return response([
                'user'=>$newUser,
                'token' => $newUser->createToken('api',[$newUser->getRoleAttribute()])->plainTextToken,
                'message' => 'Account created successfully'
            ]);
        }
    }
}