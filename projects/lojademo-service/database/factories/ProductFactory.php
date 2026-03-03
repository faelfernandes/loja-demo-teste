<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->optional(0.8)->sentence(),
            'price' => fake()->numberBetween(1000, 99999), // centavos
            'category_id' => Category::factory(),
            'image_url' => fake()->optional(0.3)->imageUrl(),
        ];
    }
}
