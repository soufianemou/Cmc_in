<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $usersIds = User::all()->pluck('id');
        $postIds = Post::all()->pluck('id');
        $comments = [];
        foreach($usersIds as $usersId) {
            //necessary since shuffle() and array_shift() take an array by reference
            $randomizedPostIds = $postIds->toArray();
            shuffle($randomizedPostIds);
            $comments[] = [
                'user_id' => $usersId,
                'post_id' => array_shift($randomizedPostIds),
                'body' => $faker->sentence()
            ];
        }
        DB::table('comments')->insert($comments);
    }
}
