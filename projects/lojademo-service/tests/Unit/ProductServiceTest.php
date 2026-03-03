<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

class ProductServiceTest extends TestCase
{
    use RefreshDatabase;

    private ProductService $productService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->productService = $this->app->make(ProductService::class);
    }

    public function test_create_converts_price_to_cents(): void
    {
        $category = Category::factory()->create();

        $product = $this->productService->create([
            'name' => 'Produto',
            'price' => 19.99,
            'category_id' => $category->id,
        ]);

        $this->assertInstanceOf(Product::class, $product);
        $this->assertEquals(1999, $product->price);
    }

    public function test_update_converts_price_to_cents_when_provided(): void
    {
        $product = Product::factory()->create(['price' => 1000]);

        $updated = $this->productService->update($product, ['price' => 25.50]);

        $this->assertEquals(2550, $updated->price);
    }

    public function test_list_paginated_returns_length_aware_paginator(): void
    {
        Product::factory()->count(2)->create();

        $result = $this->productService->listPaginated(5, null, null);

        $this->assertInstanceOf(LengthAwarePaginator::class, $result);
        $this->assertCount(2, $result->items());
    }

    public function test_delete_removes_product(): void
    {
        $product = Product::factory()->create();

        $this->productService->delete($product);

        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }
}
