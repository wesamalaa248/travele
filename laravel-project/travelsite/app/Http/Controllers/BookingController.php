<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Http\Controllers\DiscountController;
use App\Models\Discount;
use App\Models\Hotel;


class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|max:255',
    //         'address' => 'required|string|max:255',
    //         'phone' => 'required|string|max:20',
    //         'hotel_id' => 'required|integer|exists:hotels,id',
    //         'total_price' => 'required|numeric',
    //     ]);

    //     // Get the latest discount
    //     $discount = Discount::latest()->first();
    //     $discountValue = $discount ? $discount->value : 0;
    //     $totalPriceAfterDiscount = $request->total_price;

    //     $booking = Booking::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'address' => $request->address,
    //         'phone' => $request->phone,
    //         'hotel_id' => $request->hotel_id,
    //         'total_price' => $totalPriceAfterDiscount,
    //     ]);

    //     return response()->json($booking, 201);
    // }
   
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'hotel_id' => 'required|integer|exists:hotels,id',
            'total_price' => 'required|numeric',
        ]);

        // Fetch the hotel to get the discount
        $hotel = Hotel::findOrFail($request->hotel_id);
        $discountValue = $hotel->discount ?? 0;

        // Ensure total_price is the original price (not discounted)
        $originalPrice = $validated['total_price'];
        $totalPriceAfterDiscount = $originalPrice - ($originalPrice * ($discountValue / 100));

        // Log the calculated total price after discount for debugging
        \Log::info('Total Price After Discount:', ['total_price' => $totalPriceAfterDiscount]);

        $booking = Booking::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'hotel_id' => $validated['hotel_id'],
            'total_price' => $totalPriceAfterDiscount,
        ]);

        return response()->json($booking, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
