<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Admin;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use App\Http\Resources\AdminResource;

class SuperAdminController extends Controller
{
    
    public function getAdmins()
    {
        return AdminResource::collection(Admin::all());
    }

    public function getUsers()
    {
        return UserResource::collection(User::all());
    }

    public function transformUserToAdmin(User $user)
    {
        // Start a database transaction to ensure data integrity
        DB::beginTransaction();
        try {
            // Create a new admin entry
            $admin = new Admin();
            $admin->name = $user->name;
            $admin->lname = $user->lname ?? '';
            $admin->email = $user->email;
            $admin->email_verified_at = $user->email_verified_at;
            $admin->password = $user->password ? $user->password : null;
            $admin->image = 'admin/admin.jpg';
            $admin->remember_token = $user->remember_token;
            $admin->created_at = $user->created_at;
            $admin->updated_at = $user->updated_at;
            $admin->social_id = $user->social_id;
            $admin->social_type = $user->social_type;
            $admin->save();

            $user->forceDelete();
            // Commit the transaction if everything succeeds
            DB::commit();
            return response()->json([
                'message' => 'User transformed to admin successfully.',
                'admin' => new AdminResource($admin),
            ]);
        } catch (\Exception $e) {
            // If an error occurs, rollback the transaction
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to transform this user to admin.',
            ], 500);
        }
    }

    public function destroy(Admin $admin)
    {
        $admin->forceDelete();
        return response()->json([
            'message' => 'this admin Compte has been deleted successfully',
        ]);
    }

}
