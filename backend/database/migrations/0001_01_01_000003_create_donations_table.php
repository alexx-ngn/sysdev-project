<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('donations', function (Blueprint $table) {
            $table->id('DonationID');
            $table->foreignId('UserID')->constrained('users', 'UserID');
            $table->double('Amount');
            $table->date('DonationDate');
            $table->string('ConfirmationID');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('donations');
    }
};