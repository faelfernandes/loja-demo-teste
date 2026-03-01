<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $request->createUser();
        $token = $user->createToken('auth')->plainTextToken;
        return ApiResponse::success([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ], 'Usuário registrado com sucesso', 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Credenciais inválidas.'],
            ]);
        }
        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('auth')->plainTextToken;
        return ApiResponse::success([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(): JsonResponse
    {
        Auth::user()?->currentAccessToken()?->delete();
        return ApiResponse::success(null, 'Logout realizado com sucesso');
    }
}
