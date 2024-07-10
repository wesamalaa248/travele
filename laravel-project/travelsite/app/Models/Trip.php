<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'destination', 'start_date', 'end_date','guests','price', 'image'
    ];
    // Define the relationship with Flight
    public function flights()
    {
        return $this->hasMany(Flight::class);
    }
    
    // Define the relationship with Hotel
    public function hotels()
    {
        return $this->hasMany(Hotel::class);
    }
}
