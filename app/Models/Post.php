<?php

namespace App\Models;

use App\Models\User;
use App\Models\Pole;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Facades\DB;

class Post extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        "title",
        "content",
        "image",
        "pole_id",
        "user_id",
    ];


    public function pole()
    {
        return $this->belongsTo(Pole::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likers()
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id');
    }

    public function comments()
    {
        return $this->belongsToMany(User::class, 'comments', 'post_id', 'user_id')
        ->withPivot('id', 'body', 'created_at');
    }

    // protected static function booted()
    // {
    //     static::deleting(function ($post) {
    //         DB::transaction(function () use ($post) {
    //             // Delete related comments
    //             $post->comments()->detach();
    //             // Delete related likes
    //             $post->likers()->detach();
    //         });
    //     });
    // }
}
