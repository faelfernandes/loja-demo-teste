<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    public function index(): JsonResponse
    {
        $categories = $this->categoryService->listAll();
        return ApiResponse::success($categories);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $this->categoryService->create($request->validated());
        return ApiResponse::success($category, 'Categoria criada com sucesso', 201);
    }

    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $category = $this->categoryService->update($category, $request->validated());
        return ApiResponse::success($category, 'Categoria atualizada com sucesso');
    }

    public function destroy(Category $category): JsonResponse
    {
        $this->categoryService->delete($category);
        return ApiResponse::success(null, 'Categoria excluída com sucesso');
    }
}
