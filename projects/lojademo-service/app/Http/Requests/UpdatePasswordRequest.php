<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user();
    }

    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string', 'current_password'],
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->mixedCase()
                    ->symbols(),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'current_password.required' => 'A senha atual é obrigatória.',
            'current_password.current_password' => 'A senha atual está incorreta.',
            'password.required' => 'A nova senha é obrigatória.',
            'password.min' => 'A nova senha deve ter pelo menos 8 caracteres.',
            'password.letters' => 'A nova senha deve conter pelo menos uma letra.',
            'password.numbers' => 'A nova senha deve conter pelo menos um número.',
            'password.mixed' => 'A nova senha deve conter letras maiúsculas e minúsculas.',
            'password.symbols' => 'A nova senha deve conter pelo menos um caractere especial (ex.: @, #, !).',
        ];
    }

    public function updatePassword(): void
    {
        $this->user()->update([
            'password' => Hash::make($this->validated('password')),
        ]);
    }
}
