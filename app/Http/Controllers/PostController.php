<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Pole;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $POST_PER_PAGE = 3;
        $posts = Post::select(['*'])
            ->with(['user:id,name,lname,image','pole:id,name'])
            ->orderBy('created_at', 'desc');
        if ($request->has('pageNumber')) {
            // $posts->skip(($request->pageNumber - 1) * $POST_PER_PAGE)->take($POST_PER_PAGE);
            // $query->offset(($request->pageNumber - 1) * $POST_PER_PAGE)->limit($POST_PER_PAGE);
            $posts->paginate(perPage: $POST_PER_PAGE, page: $request->pageNumber);
        }
        if($request->has('pole')){
            $pole = $request->pole;
            $posts = $posts->whereHas('pole', function ($query) use ($pole) {
                $query->where('name', $pole);
            });
            // ->with('user:id,name,lname,image')->with('pole:id,name');
        }
        $result = $posts->get();
        return PostResource::collection($result);
        
    }
    public function postCount(Request $request)
    {
        $count = Post::all()->count();
        return response()->json(compact('count'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $formFields = $request->validated();
        $formFields['user_id'] = Auth::id();
        if($request->hasFile('image')){
            $this->validate($request, [
                'image' => 'image|mimes:png,jpg,jpeg,svg|max:10240',
            ]);
            $formFields['image']= $this->uploadImage($request);
        }
        // dd(Post::create($formFields));
        Post::create($formFields);
        return response()->json(["message"=>"post created successfuly"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->user;
        $post->pole;
        $post->load(['comments', 'likers']);
        return new PostResource($post);
    }

    public function toggleLike(Post $post)
    {
        $user = Auth::user();
        if ($user->likedPosts()->where('post_id', $post->id)->exists()) {
            $user->likedPosts()->detach($post->id);
        } else {
            $user->likedPosts()->attach($post->id);
        }
        // Reload the post to get the updated likers count
        $post->load(['comments', 'likers']);
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $formFields = $request->validated();       
        // Check if the user is the owner of the post
        if ($post->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'You are not authorized to update this post.',
            ], 403);
        }     
        // Update the pole if provided
        if ($request->has('pole_id')) {
            $pole = Pole::find($request->pole_id);
            if (!$pole) {
                return response()->json([
                    'message' => 'Invalid pole ID.',
                ], 400);
            }
            $post->pole()->associate($pole);
        }

        $post->fill($formFields)->save();
        $post->user;
        $post->pole;
        $post->load('likers');
        return response()->json([
            'post' => new PostResource($post),
            'message'=>"post updated successfully"
        ]);
    }


    public function updateImage(Request $request, Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'You are not authorized to update this post.',
            ]);
        }
        $oldImagePath = $post->image;
        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:png,jpg,jpeg,svg|max:10240',
            ]);
            $defaultimage = 'post/default.jpg';
            if ($oldImagePath && $defaultimage !== $oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
            $post->image = $this->uploadImage($request);
            $post->save();
        }
        $post->user;
        $post->pole;
        $post->load('likers');
        return response()->json([
            'post' => new PostResource($post),
            'message'=>"post's image updated successfully"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $defaultimage = 'post/default.jpg';
        if ($post->image && $post->image !== $defaultimage) {
            $imagePath = storage_path('app/public/' . $post->image);
            if (file_exists($imagePath)) {
                Storage::disk('public')->delete($post->image);
            }
        }
        $post->delete();
        return response()->json([
            'message' => 'post deleted successfully',
        ]);
    }

    private function uploadImage(Request $request){
        $originalFileName = $request->file('image')->getClientOriginalName();
        $fileNameWitoutExtention = substr($originalFileName,0,strrpos($originalFileName,'.'));
        $currentDate = date('Ymd_His');
        $fileName = $fileNameWitoutExtention . '_' . $currentDate . '.jpg' ;
        return $request->file('image')->storeAs('post',$fileName,'public');
    }
}
