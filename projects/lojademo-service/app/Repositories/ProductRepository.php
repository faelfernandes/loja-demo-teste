<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductRepository implements ProductRepositoryInterface
{
    public function paginate(int $perPage = 15, ?int $categoryId = null, ?string $search = null): LengthAwarePaginator
    {
        $query = Product::query()->with('category');

        if ($categoryId !== null) {
            $query->where('category_id', $categoryId);
        }

        $search = $search !== null ? trim($search) : '';
        if ($search !== '') {
            $this->applySearch($query, $search);
        }

        return $query->orderBy('name')->paginate($perPage);
    }

    private function applySearch(\Illuminate\Database\Eloquent\Builder $query, string $search): void
    {
        $minLengthForFulltext = 4;

        if (strlen($search) >= $minLengthForFulltext) {
            $query->whereFullText(['name', 'description'], $search);
            return;
        }

        $like = '%' . addcslashes($search, '%_\\') . '%';
        $query->where(function ($q) use ($like) {
            $q->where('name', 'like', $like)
                ->orWhere('description', 'like', $like);
        });
    }

    public function find(int $id): ?Product
    {
        return Product::with('category')->find($id);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(Product $product, array $data): Product
    {
        $product->update($data);
        return $product->fresh(['category']);
    }

    public function delete(Product $product): bool
    {
        return $product->delete();
    }
}
