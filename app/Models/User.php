<?php

namespace App\Models;

use App\Models\Post;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable  implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'lname',
        'email',
        'password',
        'image',
        'email_verified_at',
        'social_id',
        'social_type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'deleted_at',
        'updated_at',
        'email_verified_at'
        
    ];

    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'user';
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function likedPosts()
    {
        return $this->belongsToMany(Post::class, 'likes', 'user_id', 'post_id');
    }

    public function comentedPosts()
    {
        return $this->belongsToMany(Post::class, 'comments', 'user_id', 'post_id')
        ->withPivot('body');
    }

    // protected static function booted()
    // {
    //     static::deleting(function ($user) {
    //         DB::transaction(function () use ($user) {
    //             // Soft delete related posts
    //             DB::table('posts')
    //                 ->where('user_id', $user->id)
    //                 ->update(['deleted_at' => now()]);
    //             DB::table('comments')
    //                 ->where('user_id', $user->id)
    //                 ->delete();
    //             DB::table('likes')
    //                 ->where('user_id', $user->id)
    //                 ->delete();
    //         });
    //     });
    // }
}
