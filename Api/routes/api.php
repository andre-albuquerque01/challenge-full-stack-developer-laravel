<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {
    Route::post('login', [UserController::class, 'login']);
    Route::post('email/recoverPasswordSendEmail', [UserController::class, 'recoverPasswordSendEmail']);
    Route::put('resetPassword', [UserController::class, 'resetPassword']);
    Route::post('user', [UserController::class, 'store']);
    
    Route::middleware('auth:api')->group(function () {
        Route::get('user', [UserController::class, 'show']);
        Route::put('user', [UserController::class, 'update']);
        Route::delete('user', [UserController::class, 'destroy']);
        Route::apiResource('student', StudentController::class);
    });
});
