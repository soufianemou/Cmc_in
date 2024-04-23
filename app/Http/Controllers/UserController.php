<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\updateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load(['posts.pole', 'posts.user']);
        return new UserResource($user);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(updateUserRequest $request, User $user)
    {
        $formFields = $request->validated();
        if ($request->has('password')) {
            $formFields['password'] = Hash::make($request->password);
        }
        $user->fill($formFields)->save();
        $user = $user->fresh();
        $user->load(['posts.pole', 'posts.user']);
        return response()->json([
            'user' => new UserResource($user),
            'message'=>"your profile updated successfully"
        ]);
    }


    public function updateImage(Request $request, User $user)
    {
        if ($user->id !== Auth::id()) {
            return response()->json([
                'message' => 'You are not authorized to update this image.',
            ], 403);
        }
        $request->validate([
            'image' => 'image|mimes:png,jpg,jpeg,svg|max:10240',
        ]);
        // Retrieve the old image path
        $oldImagePath = $user->image;
        if ($request->hasFile('image')) {
            $defaultimage = 'user/user.jpg';
            if ($oldImagePath && $oldImagePath !== $defaultimage && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
            $user->image = $this->uploadImage($request);
            $user->save();
        }
        $user->load(['posts.pole', 'posts.user']);
        // return new UserResource($user);
        return response()->json([
            'user' => new UserResource($user),
            'message'=>"image updated successfully"
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $defaultimage = 'user/user.jpg';
        if ($user->image && $user->image !== $defaultimage) {
            $imagePath = storage_path('app/public/' . $user->image); // Adjust path if needed
            if (file_exists($imagePath)) {
                Storage::disk('public')->delete($user->image);
            }
        }
        // Log out the user
        Auth::guard('web')->logout();
        // Revoke the user's tokens
        $user->tokens()->delete();
        // Delete the user
        $user->delete();
        return response()->json([
            'message' => 'Your Compte has been deleted successfully',
        ]);
    }


    private function uploadImage(Request $request){
        $originalFileName = $request->file('image')->getClientOriginalName();
        $fileNameWitoutExtention = substr($originalFileName,0,strrpos($originalFileName,'.'));
        $currentDate = date('Ymd_His');
        $fileName = $fileNameWitoutExtention . '_' . $currentDate . '.jpg' ;
        return $request->file('image')->storeAs('user',$fileName,'public');
    }
}
