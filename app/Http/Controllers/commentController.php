<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreCommentRequest;

class commentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $comments = DB::table('comments')
        //         ->select('id', 'body','user_id','created_at')
        //         ->get();
        // return response()->json($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Post $post, StoreCommentRequest $request)
    {
        $user = Auth::user();
        $comment = $request->validated();
        $comment['user_id'] = $user->id;
        $post->comments()->attach($user->id, [
            'body' => $comment['body'],
            'created_at' => now(), 
        ]);
        // Reload the post with comments and pivot data
        $post = $post->load(['comments' => function ($query) {
            $query->withPivot('body','created_at');
        }]);
        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Auth::user();
        $newCommentBody = $request->input('body'); // Assuming 'body' is the key for the updated comment body
        $updatedRows = DB::table('comments')
                    ->where('id', $id)
                    ->where('user_id', $user->id)
                    ->update(['body' => $newCommentBody]);
        if ($updatedRows > 0) {
            return response()->json([
                'message' => 'Comment updated successfully',
            ]);
        } else {
            return response()->json([
                'message' => 'Comment not found or you do not have permission to update it',
            ], Response::HTTP_NOT_FOUND);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    //(Post $post ,Request $request)
    public function destroy(string $id)   
    {
        $user = Auth::user();
        $deletedRows = DB::table('comments')
                        ->where('id', $id)
                        ->where('user_id', $user->id)
                        ->delete();
        if ($deletedRows > 0) {
            return response()->json([
                'message' => 'Comment deleted successfully',
            ]);
        } else {
            return response()->json([
                'message' => 'Comment not found or you do not have permission to delete it',
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
