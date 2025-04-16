<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('donations', function (Blueprint $table) {
            $table->id('DonationID');
            $table->string('name');
            $table->string('email');
            $table->decimal('Amount', 8, 2);
            $table->timestamp('DonationDate');
            $table->string('type');
            $table->string('ConfirmationID');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('donations');
    }
};