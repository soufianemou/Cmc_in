<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    
    public function store(LoginRequest $request)
{
    $request->authenticate();

    $request->session()->regenerate();

    $userTypes = ['web', 'admin', 'superadmin'];
    foreach ($userTypes as $userType) {
        $user = Auth::guard($userType)->user();
        if ($user) {
            // Check if the user has verified their email
            if (!$user->hasVerifiedEmail()) {
                Auth::guard($userType)->logout();
                return response()->json([
                    'message' => 'Please verify your email address.',
                ], 403); // Forbidden
            }
            // User is found and has verified their email, generate token and return response
            $sessionExpiration = Config::get('session.lifetime'); 
            return response([
                'user' => $user,
                'token' => $user->createToken('api', [$user->getRoleAttribute()])->plainTextToken,
                'session_expiration' => now()->addMinutes($sessionExpiration)->toISOString(),
            ]);
        }
    }

    // If no user is authenticated, return an error
    return response()->json([
        'message' => 'Authentication failed.',
    ], 401); // Unauthorized
}


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        
        $user = Auth::guard('web')->user();  
        if ($user) {
            $user->tokens()->delete();
        }
        Auth::guard('web')->logout();

        $admin = Auth::guard('admin')->user();   
        if ($admin) {
            $admin->tokens()->delete();
        }
        Auth::guard('admin')->logout();

        $superadmin = Auth::guard('superadmin')->user();   
        if ($superadmin) {
            $superadmin->tokens()->delete();
        }
        Auth::guard('superadmin')->logout();
        
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
