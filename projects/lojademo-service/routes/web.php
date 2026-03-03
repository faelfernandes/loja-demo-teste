<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'LojaDemo API',
        'endpoints' => url('/api'),
    ]);
});
