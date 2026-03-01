<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Eletrônicos'],
            ['name' => 'Roupas'],
            ['name' => 'Livros'],
            ['name' => 'Casa'],
        ];
        foreach ($categories as $cat) {
            Category::firstOrCreate($cat);
        }
    }
}
