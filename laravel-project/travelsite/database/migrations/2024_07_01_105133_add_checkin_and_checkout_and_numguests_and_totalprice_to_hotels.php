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
        Schema::table('hotels', function (Blueprint $table) {
            $table->date('checkin')->nullable()->after('duration');
            $table->date('checkout')->nullable()->after('checkin');
            $table->integer('numguests')->nullable()->after('checkout');
            $table->decimal('totalprice', 8, 2)->nullable()->after('numguests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn(['checkin', 'checkout', 'numguests', 'totalprice']);
        });
    }
};
