<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_price_promotional_applies_ten_percent_discount(): void
    {
        $product = Product::factory()->create(['price' => 10000]); // 100,00 em centavos

        $this->assertSame(9000, $product->price_promotional); // 10% off = 90,00
    }

    public function test_price_promotional_rounds_to_integer(): void
    {
        $product = Product::factory()->create(['price' => 9999]); // 99,99

        $this->assertSame(8999, $product->price_promotional); // 89,991 -> 8999
    }

    public function test_product_belongs_to_category(): void
    {
        $category = Category::factory()->create();
        $product = Product::factory()->create(['category_id' => $category->id]);

        $this->assertInstanceOf(Category::class, $product->category);
        $this->assertEquals($category->id, $product->category->id);
    }

    public function test_product_has_fillable_attributes(): void
    {
        $product = new Product;

        $this->assertEquals(
            ['name', 'description', 'price', 'category_id', 'image_url'],
            $product->getFillable()
        );
    }
}
