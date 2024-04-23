<?php

namespace App\Http\Controllers;
use App\Models\Post;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\PoleResource;
use App\Http\Requests\updateAdminRequest;
use App\Http\Requests\StorePoleRequest;
use App\Http\Requests\UpdatePoleRequest;
use App\Models\Pole;

class AdminController extends Controller
{
    public function allPoles()
    {
        return PoleResource::collection(Pole::all());
    }

    public function storePole(StorePoleRequest $request)
    {
        $pole = Pole::create($request->validated());

        return response()->json([
            'message' => 'Pole created successfully',
            'pole' => new PoleResource($pole),
        ]);
    }

    public function showPole(Pole $pole)
    {
        return new PoleResource($pole);
    }

    public function updatePole(UpdatePoleRequest $request, Pole $pole)
    {
        $pole->update($request->validated());
        return response()->json([
            'message' => 'Pole updated successfully',
            'pole' => new PoleResource($pole),
        ]);
    }

    public function destroyPole(Pole $pole)
    {
        $pole->delete();
        return response()->json([
            'message' => 'Pole deleted successfully',
        ]);
    }

    public function allComments()
    {
        $comments = DB::table('comments')
                ->select('id', 'body','user_id','created_at')
                ->orderByDesc('created_at')
                ->get();
        return response()->json($comments);
    }

    public function destroyComment(string $id)   
    {
        $deletedRows = DB::table('comments')
                        ->where('id', $id)
                        ->delete();
        if ($deletedRows > 0) {
            return response()->json([
                'message' => 'Comment deleted successfully',
            ]);
        } else {
            return response()->json([
                'message' => 'Comment not found',
            ]);
        }
    }

    public function destroyPost(Post $post)
    {
        $oldImagePath = $post->image;
        $defaultimage = 'post/default.jpg';
        if ($oldImagePath && $defaultimage !== $oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
            Storage::disk('public')->delete($oldImagePath);
        }
        $post->delete();
        return response()->json([
            'message' => 'post deleted successfully',
        ]);
    }

    public function allUsers()
    {
        return UserResource::collection(User::all());
    }

    public function destroyUser(User $user)
    {
        $defaultimage = 'user/user.jpg';
        $oldImagePath = $user->image;
        if ($oldImagePath && $oldImagePath !== $defaultimage && Storage::disk('public')->exists($oldImagePath)) {
            Storage::disk('public')->delete($oldImagePath);
        }
        // Delete the user
        $user->delete();
        return response()->json([
            'message' => 'the user has been deleted successfully',
        ]);
    }

    public function updateAdminProfile(updateAdminRequest $request, Admin $admin)
    {
        $formFields = $request->validated();
        if ($request->has('password')) {
            $formFields['password'] = Hash::make($request->password);
        }
        $admin->fill($formFields)->save();
        return response()->json([
            'message' => 'profile updated successfully',
            'admin' => $admin,
        ]);

    }

    public function updateAdminImage(Request $request, Admin $admin)
    {
        if ($admin->id !== Auth::id()) {
            return response()->json([
                'message' => 'You are not authorized to update this post.',
            ], 403);
        }
        $request->validate([
            'image' => 'image|mimes:png,jpg,jpeg,svg|max:10240',
        ]);
        // Retrieve the old image path
        $oldImagePath = $admin->image;
        if ($request->hasFile('image')) {
            if ($oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
            $admin->image = $this->uploadImage($request);
            $admin->save();
        }
        return response()->json([
            'message' => 'image updated successfully',
            'admin' => $admin,
        ]);
    }

    public static function topThreeLikedPosts()
    {
        return Post::select('id', 'title', 'image' )
            ->withCount('likers as likes_count')
            ->orderByDesc('likes_count')
            ->take(3)
            ->get();
    }

    public static function postCountPerPole()
    {
        return Pole::select('id', 'name')
            ->withCount('posts')
            ->get();
    }

    public static function topCommenters()
    {
        return DB::table('users')
            ->select('id', 'name', 'lname', 'image', 'email')
            ->selectRaw('(SELECT COUNT(*) FROM comments WHERE comments.user_id = users.id) as count')
            ->orderByDesc('count')
            ->take(3)
            ->get();
    }

    public static function totalCommentsPerPole() {
        return DB::table('poles')
            ->leftJoin('posts', 'poles.id', '=', 'posts.pole_id')
            ->leftJoin('comments', 'posts.id', '=', 'comments.post_id')
            ->select('poles.id', 'poles.name', DB::raw('COUNT(comments.id) as total_comments'))
            ->groupBy('poles.id', 'poles.name')
            ->get();
    }

    private function uploadImage(Request $request){
        $originalFileName = $request->file('image')->getClientOriginalName();
        $fileNameWitoutExtention = substr($originalFileName,0,strrpos($originalFileName,'.'));
        $currentDate = date('Ymd_His');
        $fileName = $fileNameWitoutExtention . '_' . $currentDate . '.jpg' ;
        return $request->file('image')->storeAs('admin',$fileName,'public');
    }
}
