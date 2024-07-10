<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Flight extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'airline', 'flight_number', 'departure_airport', 'departure_time',
        'arrival_airport', 'arrival_time', 'price', 'travel_class', 'duration', 'trip_id', 'airline_image',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    // Accessor for image URL
    public function getAirlineImageUrlAttribute()
    {
        return $this->airline_image ? asset('storage/' . $this->airline_image) : null;
    }

    // Append the accessor to the model's array form
    protected $appends = ['airline_image_url'];
    
}
