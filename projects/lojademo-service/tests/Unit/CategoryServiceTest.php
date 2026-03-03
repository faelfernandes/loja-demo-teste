<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;
use Tests\TestCase;

class CategoryServiceTest extends TestCase
{
    use RefreshDatabase;

    private CategoryService $categoryService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->categoryService = $this->app->make(CategoryService::class);
    }

    public function test_list_all_returns_collection_ordered_by_name(): void
    {
        Category::factory()->create(['name' => 'Zebra']);
        Category::factory()->create(['name' => 'Alpha']);

        $result = $this->categoryService->listAll();

        $this->assertInstanceOf(Collection::class, $result);
        $this->assertCount(2, $result);
        $this->assertEquals('Alpha', $result->first()->name);
    }

    public function test_create_persists_category(): void
    {
        $category = $this->categoryService->create(['name' => 'Nova Categoria']);

        $this->assertInstanceOf(Category::class, $category);
        $this->assertEquals('Nova Categoria', $category->name);
        $this->assertDatabaseHas('categories', ['name' => 'Nova Categoria']);
    }

    public function test_update_modifies_category(): void
    {
        $category = Category::factory()->create(['name' => 'Antiga']);

        $updated = $this->categoryService->update($category, ['name' => 'Atualizada']);

        $this->assertEquals('Atualizada', $updated->name);
        $this->assertDatabaseHas('categories', ['id' => $category->id, 'name' => 'Atualizada']);
    }

    public function test_delete_removes_category(): void
    {
        $category = Category::factory()->create();

        $this->categoryService->delete($category);

        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }
}
