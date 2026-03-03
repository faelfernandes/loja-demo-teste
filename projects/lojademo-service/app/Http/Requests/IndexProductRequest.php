<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexProductRequest extends FormRequest
{
    private const MAX_PER_PAGE = 50;
    private const DEFAULT_PER_PAGE = 16;

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $category = $this->query('category') ?? $this->query('category_id') ?? $this->query('categoryid');
        $search = $this->query('search') ?? $this->query('searchquery');
        $perPage = $this->query('per_page', self::DEFAULT_PER_PAGE);

        $this->merge([
            'category' => $category !== null && $category !== '' ? (int) $category : null,
            'search' => is_string($search) ? $search : null,
            'per_page' => max(1, min((int) $perPage, self::MAX_PER_PAGE)),
        ]);
    }

    public function rules(): array
    {
        return [
            'category' => ['nullable', 'integer'],
            'search' => ['nullable', 'string', 'max:255'],
            'per_page' => ['integer', 'min:1', 'max:' . self::MAX_PER_PAGE],
        ];
    }

    public function getCategoryId(): ?int
    {
        return $this->validated('category');
    }

    public function getSearch(): ?string
    {
        return $this->validated('search');
    }

    public function getPerPage(): int
    {
        return (int) ($this->validated('per_page') ?? self::DEFAULT_PER_PAGE);
    }
}
