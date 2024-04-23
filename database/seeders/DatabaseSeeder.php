<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Pole;
use App\Models\Post;
use App\Models\User;
use App\Models\Admin;
use App\Models\SuperAdmin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\Seeders\CommentSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        SuperAdmin::factory(1)->create();
        Admin::factory(1)->create();
        User::factory(4)->create();
        Pole::factory(4)->create();
        Post::factory(4)->create();
        $this->call(CommentSeeder::class);
    }
    
}
