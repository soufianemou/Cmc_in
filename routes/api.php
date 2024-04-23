<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\commentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\SuperAdminController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware(['auth:sanctum,,admin,superadmin'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['auth:sanctum','ability:user'])->prefix('user')->group(static function (){
    Route::apiResource('/posts',PostController::class);
    Route::post('/posts/image/{post}',[PostController::class,'updateImage']);
    Route::put('/posts/toggleLike/{post}',[PostController::class,'toggleLike']);
    Route::delete('/profiles/{user}',[UserController::class,'destroy']);
    Route::put('/profiles/{user}',[UserController::class,'update']);
    Route::post('/profiles/image/{user}',[UserController::class,'updateImage']);
    Route::post('/comments/{post}',[commentController::class,'store']);
    Route::put('/comments/{commentId}',[commentController::class,'update']);
    Route::delete('/comments/{commentId}',[commentController::class,'destroy']);
});


Route::middleware(['auth:sanctum','ability:admin'])->prefix('admin')->group(static function (){
    Route::get('/poles',[AdminController::class,'allPoles']);
    Route::post('/poles',[AdminController::class,'storePole']);
    Route::get('/poles/{pole}',[AdminController::class,'showPole']);
    Route::put('/poles/{pole}',[AdminController::class,'updatePole']);
    Route::delete('/pole/{pole}',[AdminController::class,'destroyPole']);
    Route::delete('/comments/{post}',[AdminController::class,'destroyComment']);
    Route::get('/comments',[AdminController::class,'allComments']);
    Route::delete('/posts/{post}',[AdminController::class,'destroyPost']);
    Route::get('/profiles',[AdminController::class,'allUsers']);
    Route::delete('/profiles/{user}',[AdminController::class,'destroyUser']);
    Route::put('/profiles/{admin}',[AdminController::class,'updateAdminProfile']);
    Route::post('/profiles/image/{admin}',[AdminController::class,'updateAdminImage']);
    Route::get('/postCountPerPole',[AdminController::class,'postCountPerPole']);
    Route::get('/totalCommentsPerPole',[AdminController::class,'totalCommentsPerPole']);
    Route::get('/topThreeLikedPosts',[AdminController::class,'topThreeLikedPosts']);
    Route::get('/topCommenters',[AdminController::class,'topCommenters']);
    
});
Route::middleware(['auth:sanctum','ability:superadmin'])->prefix('superadmin')->group(static function (){
    Route::get('/admins',[SuperAdminController::class,'getAdmins']);
    Route::get('/users',[SuperAdminController::class,'getUsers']);
    Route::delete('/admins/{admin}',[SuperAdminController::class,'destroy']);
    Route::post('/transform/{user}',[SuperAdminController::class,'transformUserToAdmin']);
});

Route::get('/poles',[AdminController::class,'allPoles']);
Route::get('/posts/postCount',[PostController::class,'postCount']);
Route::get('/posts/{post}',[PostController::class,'show']);
Route::get('/posts/{pageNumber?}/{pole?}',[PostController::class,'index']);

Route::get('/profiles',[UserController::class,'index']);
Route::get('/profiles/{user}',[UserController::class,'show']);
Route::post('/contact',[ContactController::class,'store']);

Route::get('/auth/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);


require __DIR__.'/auth.php';





