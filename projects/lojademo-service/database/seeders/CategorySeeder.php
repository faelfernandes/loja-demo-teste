<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Tênis'],
            ['name' => 'Roupas Esportivas'],
            ['name' => 'Acessórios'],
            ['name' => 'Equipamentos'],
        ];

        foreach ($categories as $attributes) {
            Category::firstOrCreate($attributes);
        }
    }
}
