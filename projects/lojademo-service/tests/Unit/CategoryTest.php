<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_has_many_products(): void
    {
        $category = Category::factory()->create();
        Product::factory()->count(3)->create(['category_id' => $category->id]);

        $this->assertCount(3, $category->products);
        $category->products->each(fn ($product) => $this->assertInstanceOf(Product::class, $product));
    }

    public function test_category_has_fillable_name(): void
    {
        $category = new Category;

        $this->assertEquals(['name'], $category->getFillable());
    }
}
