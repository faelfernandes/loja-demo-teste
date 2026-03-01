<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();
        if ($categories->isEmpty()) {
            return;
        }
        $products = [
            ['name' => 'Notebook', 'description' => 'Notebook 15 polegadas', 'price' => 2999.90, 'category' => 'Eletrônicos'],
            ['name' => 'Camiseta', 'description' => 'Camiseta básica algodão', 'price' => 49.90, 'category' => 'Roupas'],
            ['name' => 'Clean Code', 'description' => 'Livro Clean Code - Robert Martin', 'price' => 89.90, 'category' => 'Livros'],
        ];
        foreach ($products as $p) {
            $category = $categories->firstWhere('name', $p['category']);
            if ($category) {
                Product::firstOrCreate(
                    ['name' => $p['name']],
                    [
                        'description' => $p['description'],
                        'price' => $p['price'],
                        'category_id' => $category->id,
                        'image_url' => null,
                    ]
                );
            }
        }
    }
}
