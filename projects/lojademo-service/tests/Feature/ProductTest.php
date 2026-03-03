<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
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

    public function test_index_returns_paginated_products(): void
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'description', 'price', 'category_id', 'price_promotional', 'category'],
                ],
                'links',
                'meta',
            ]);
        $this->assertCount(3, $response->json('data'));
    }

    public function test_index_can_filter_by_category(): void
    {
        $category = Category::factory()->create();
        Product::factory()->count(2)->create(['category_id' => $category->id]);
        Product::factory()->create(); // outra categoria

        $response = $this->getJson('/api/products?category=' . $category->id);

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
        foreach ($response->json('data') as $item) {
            $this->assertEquals($category->id, $item['category_id']);
        }
    }

    public function test_index_can_filter_by_search(): void
    {
        Product::factory()->create(['name' => 'Notebook Gamer', 'description' => 'PC portátil']);
        Product::factory()->create(['name' => 'Teclado Mecânico', 'description' => 'Periférico']);
        Product::factory()->create(['name' => 'Mouse Wireless', 'description' => 'Sem match']);

        $response = $this->getJson('/api/products?search=Gam');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(1, $data);
        $this->assertEquals('Notebook Gamer', $data[0]['name']);
    }

    public function test_index_respects_per_page(): void
    {
        Product::factory()->count(5)->create();

        $response = $this->getJson('/api/products?per_page=2');

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
        $this->assertEquals(2, $response->json('meta.per_page'));
    }

    public function test_index_accepts_category_id_alias(): void
    {
        $category = Category::factory()->create();
        Product::factory()->count(2)->create(['category_id' => $category->id]);
        Product::factory()->create();

        $response = $this->getJson('/api/products?category_id=' . $category->id);

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
    }

    public function test_show_returns_product_with_category(): void
    {
        $product = Product::factory()->create();

        $response = $this->getJson('/api/products/' . $product->id);

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $product->id)
            ->assertJsonPath('data.name', $product->name)
            ->assertJsonPath('data.category.id', $product->category->id);
    }

    public function test_show_returns_404_for_missing_product(): void
    {
        $response = $this->getJson('/api/products/99999');

        $response->assertStatus(404);
    }

    public function test_store_creates_product_when_authenticated(): void
    {
        $user = $this->createAuthenticatedUser();
        $category = Category::factory()->create();

        $payload = [
            'name' => 'Produto Novo',
            'description' => 'Descrição do produto',
            'price' => 99.90,
            'category_id' => $category->id,
        ];

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->postJson('/api/products', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'Produto Novo')
            ->assertJsonPath('data.category_id', $category->id);

        $this->assertDatabaseHas('products', ['name' => 'Produto Novo']);
    }

    public function test_store_stores_price_in_cents(): void
    {
        $user = $this->createAuthenticatedUser();
        $category = Category::factory()->create();

        $this->withHeaders($this->getAuthHeader($user))
            ->postJson('/api/products', [
                'name' => 'Produto',
                'price' => 99.90,
                'category_id' => $category->id,
            ])
            ->assertStatus(201);

        $this->assertDatabaseHas('products', [
            'name' => 'Produto',
            'price' => 9990,
        ]);
    }

    public function test_store_validates_category_id_exists(): void
    {
        $user = $this->createAuthenticatedUser();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->postJson('/api/products', [
                'name' => 'Produto',
                'price' => 10,
                'category_id' => 99999,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['category_id']);
    }

    public function test_store_validates_image_url_format(): void
    {
        $user = $this->createAuthenticatedUser();
        $category = Category::factory()->create();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->postJson('/api/products', [
                'name' => 'Produto',
                'price' => 10,
                'category_id' => $category->id,
                'image_url' => 'not-a-valid-url',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['image_url']);
    }

    public function test_store_requires_authentication(): void
    {
        $category = Category::factory()->create();

        $response = $this->postJson('/api/products', [
            'name' => 'Produto',
            'price' => 10,
            'category_id' => $category->id,
        ]);

        $response->assertStatus(401);
    }

    public function test_store_validates_required_fields(): void
    {
        $user = $this->createAuthenticatedUser();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->postJson('/api/products', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'price', 'category_id']);
    }

    public function test_update_modifies_product_when_authenticated(): void
    {
        $user = $this->createAuthenticatedUser();
        $product = Product::factory()->create(['name' => 'Nome Antigo']);

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->putJson('/api/products/' . $product->id, [
                'name' => 'Nome Atualizado',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'Nome Atualizado');
        $product->refresh();
        $this->assertEquals('Nome Atualizado', $product->name);
    }

    public function test_update_with_price_converts_to_cents(): void
    {
        $user = $this->createAuthenticatedUser();
        $product = Product::factory()->create(['price' => 5000]);

        $this->withHeaders($this->getAuthHeader($user))
            ->putJson('/api/products/' . $product->id, [
                'price' => 129.99,
            ])
            ->assertStatus(200);

        $product->refresh();
        $this->assertEquals(12999, $product->price);
    }

    public function test_update_validates_category_id_exists_when_provided(): void
    {
        $user = $this->createAuthenticatedUser();
        $product = Product::factory()->create();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->putJson('/api/products/' . $product->id, [
                'category_id' => 99999,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['category_id']);
    }

    public function test_update_requires_authentication(): void
    {
        $product = Product::factory()->create();

        $response = $this->putJson('/api/products/' . $product->id, ['name' => 'Novo']);

        $response->assertStatus(401);
    }

    public function test_destroy_deletes_product_when_authenticated(): void
    {
        $user = $this->createAuthenticatedUser();
        $product = Product::factory()->create();

        $response = $this->withHeaders($this->getAuthHeader($user))
            ->deleteJson('/api/products/' . $product->id);

        $response->assertStatus(204);
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    public function test_destroy_requires_authentication(): void
    {
        $product = Product::factory()->create();

        $response = $this->deleteJson('/api/products/' . $product->id);

        $response->assertStatus(401);
    }
}
