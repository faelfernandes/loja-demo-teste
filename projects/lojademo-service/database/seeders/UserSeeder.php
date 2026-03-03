<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'teste@lojademo.com'],
            [
                'name' => 'Teste Silva',
                'password' => Hash::make('Teste123!'),
                'email_verified_at' => now(),
            ]
        );
    }
}
