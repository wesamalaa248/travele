<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('airline');
            $table->string('airline_image')->nullable();
            $table->string('flight_number');
            $table->string('departure_airport');
            $table->Time('departure_time');
            $table->string('arrival_airport');
            $table->Time('arrival_time');
            $table->decimal('price', 8, 2);
            $table->string('class');
            $table->integer('duration');
            $table->foreignId('trip_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flights');
    }
};
