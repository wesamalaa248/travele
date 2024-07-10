<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $table = 'reviews';

    protected $fillable = ['hotel_id', 'name', 'comment'];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
