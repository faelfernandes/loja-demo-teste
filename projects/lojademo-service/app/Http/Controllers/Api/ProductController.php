<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $categoryId = $request->query('category') ? (int) $request->query('category') : null;
        $search = $request->query('search');
        $perPage = min((int) $request->query('per_page', 15), 50);
        $paginated = $this->productService->listPaginated($perPage, $categoryId, $search);
        return ApiResponse::success($paginated);
    }

    public function show(int $id): JsonResponse
    {
        $product = $this->productService->find($id);
        if (! $product) {
            return ApiResponse::error('Produto não encontrado', 404);
        }
        return ApiResponse::success($product);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productService->create($request->validated());
        return ApiResponse::success($product, 'Produto criado com sucesso', 201);
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $product = $this->productService->update($product, $request->validated());
        return ApiResponse::success($product, 'Produto atualizado com sucesso');
    }

    public function destroy(Product $product): JsonResponse
    {
        $this->productService->delete($product);
        return ApiResponse::success(null, 'Produto excluído com sucesso');
    }
}
