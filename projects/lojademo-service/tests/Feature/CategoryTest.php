<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    private function createAuthenticatedUser(): User
    {
        return User::factory()->create();
    }

    private function getAuthHeader(User $user): array
    {
        $token = $user->createToken('auth')->plainTextToken;

        return ['Authorization' => 'Bearer ' . $token];
    }

    public function test_index_returns_all_categories(): void
    {
        Category::factory()->count(3)->create();

        $response = $this->getJson('/api/categories');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'created_at', 'updated_at'],
                ],
            ]);
        $this->assertCount(3, $response->json('data'));
    }

    public function test_store_creates_category_when_authenticated(): void
    {
        $user = $this->createAuthenticatedUser();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->postJson('/api/categories', ['name' => 'Eletrônicos']);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'Eletrônicos');
        $this->assertDatabaseHas('categories', ['name' => 'Eletrônicos']);
    }

    public function test_store_requires_authentication(): void
    {
        $response = $this->postJson('/api/categories', ['name' => 'Categoria']);

        $response->assertStatus(401);
    }

    public function test_store_validates_name_required(): void
    {
        $user = $this->createAuthenticatedUser();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->postJson('/api/categories', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_update_modifies_category_when_authenticated(): void
    {
        $user = $this->createAuthenticatedUser();
        $category = Category::factory()->create(['name' => 'Antiga']);

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->putJson('/api/categories/' . $category->id, ['name' => 'Atualizada']);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'Atualizada');
        $category->refresh();
        $this->assertEquals('Atualizada', $category->name);
    }

    public function test_update_requires_authentication(): void
    {
        $category = Category::factory()->create();

        $response = $this->putJson('/api/categories/' . $category->id, ['name' => 'Nova']);

        $response->assertStatus(401);
    }

    public function test_update_validates_name_max_length(): void
    {
        $user = $this->createAuthenticatedUser();
        $category = Category::factory()->create();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->putJson('/api/categories/' . $category->id, [
                'name' => str_repeat('a', 256),
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_destroy_deletes_category_when_authenticated(): void
    {
        $user = $this->createAuthenticatedUser();
        $category = Category::factory()->create();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->deleteJson('/api/categories/' . $category->id);

        $response->assertStatus(204);
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }

    public function test_destroy_requires_authentication(): void
    {
        $category = Category::factory()->create();

        $response = $this->deleteJson('/api/categories/' . $category->id);

        $response->assertStatus(401);
    }
}
