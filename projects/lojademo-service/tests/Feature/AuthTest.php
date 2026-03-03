<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_creates_user_and_returns_token(): void
    {
        $payload = [
            'name' => 'João Silva',
            'email' => 'joao@example.com',
            'password' => 'Senha@123',
            'password_confirmation' => 'Senha@123',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email'],
                'token',
                'token_type',
            ])
            ->assertJson(['token_type' => 'Bearer']);

        $this->assertDatabaseHas('users', ['email' => 'joao@example.com']);
    }

    public function test_register_fails_with_invalid_data(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'weak',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    public function test_register_fails_with_duplicate_email(): void
    {
        User::factory()->create(['email' => 'existente@example.com']);

        $response = $this->postJson('/api/register', [
            'name' => 'Outro Usuário',
            'email' => 'existente@example.com',
            'password' => 'Senha@123',
            'password_confirmation' => 'Senha@123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_login_returns_token_with_valid_credentials(): void
    {
        User::factory()->create([
            'email' => 'login@example.com',
            'password' => 'Senha@123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'login@example.com',
            'password' => 'Senha@123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email'],
                'token',
                'token_type',
            ]);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        User::factory()->create(['email' => 'user@example.com']);

        $response = $this->postJson('/api/login', [
            'email' => 'user@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_logout_revokes_token(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/logout');

        $response->assertStatus(204);
        $this->assertCount(0, $user->fresh()->tokens);
    }

    public function test_logout_requires_authentication(): void
    {
        $response = $this->postJson('/api/logout');

        $response->assertStatus(401);
    }

    public function test_update_password_succeeds_with_valid_data(): void
    {
        $user = User::factory()->create(['password' => 'OldPass@1']);
        $token = $user->createToken('auth')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/user/password', [
                'current_password' => 'OldPass@1',
                'password' => 'NewPass@123',
                'password_confirmation' => 'NewPass@123',
            ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Senha atualizada com sucesso.']);

        $user->refresh();
        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('NewPass@123', $user->password));
    }

    public function test_update_password_requires_authentication(): void
    {
        $response = $this->putJson('/api/user/password', [
            'current_password' => 'OldPass@1',
            'password' => 'NewPass@123',
            'password_confirmation' => 'NewPass@123',
        ]);

        $response->assertStatus(401);
    }
}
