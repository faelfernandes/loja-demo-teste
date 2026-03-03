<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductService
{
    public function __construct(
        private ProductRepositoryInterface $productRepository
    ) {}

    public function listPaginated(int $perPage = 15, ?int $categoryId = null, ?string $search = null): LengthAwarePaginator
    {
        return $this->productRepository->paginate($perPage, $categoryId, $search);
    }

    public function find(int $id): ?Product
    {
        return $this->productRepository->find($id)?->loadMissing('category');
    }

    public function create(array $data): Product
    {
        $data['price'] = (int) round(($data['price'] ?? 0) * 100);

        return $this->productRepository->create($data);
    }

    public function update(Product $product, array $data): Product
    {
        if (isset($data['price'])) {
            $data['price'] = (int) round($data['price'] * 100);
        }

        return $this->productRepository->update($product, $data);
    }

    public function delete(Product $product): bool
    {
        return $this->productRepository->delete($product);
    }
}
