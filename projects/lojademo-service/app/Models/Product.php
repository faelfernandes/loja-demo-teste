<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    private const DISCOUNT_PERCENT = 10;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'image_url',
    ];

    protected $appends = ['price_promotional'];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getPricePromotionalAttribute(): int
    {
        $multiplier = 1 - (self::DISCOUNT_PERCENT / 100);

        return (int) round($this->price * $multiplier);
    }
}
