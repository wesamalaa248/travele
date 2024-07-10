<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Hotel extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'name', 'location', 'rate','duration','checkin','checkout','numguests','discount',
        'totalprice','hoteldetails','roomtype', 'price_per_night', 'image','trip_id'
    ];
    
    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }
    
    public function images()
    {
        return $this->hasMany(HotelImage::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    
    public function discounts()
    {
        return $this->hasMany(Discount::class);
    }
}
