<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedInteger('price'); // centavos
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('image_url')->nullable();
            $table->timestamps();

            $table->index(['category_id', 'name'], 'idx_products_category_name');
            $table->fullText(['name', 'description'], 'ft_products_name_description');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
