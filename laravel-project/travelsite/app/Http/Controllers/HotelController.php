<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $hotels = Hotel::all();
        return response()->json($hotels);
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'rate' => 'required|integer|min:1|max:5',
            'duration' => 'integer',
            'hoteldetails' => 'required|string',
            'discount' => 'integer',
            'price_per_night' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // Validate image,
            'trip_id' => 'required|exists:trips,id',
        ]);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('images', 'public');
        }
    
        $hotel = Hotel::create($validated);
        return response()->json($hotel, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function getHotelsWithDiscount()
    {
    $hotels = Hotel::whereNotNull('discount')->where('discount', '>', 0)->get();
    return response()->json($hotels);
    }
    
    public function getHotelsByTrip($tripId)
    {
        $hotels = Hotel::where('trip_id', $tripId)->get();
        return response()->json($hotels);
    }

    public function show($id)
    {
        $hotel = Hotel::with('images')->findOrFail($id);
        // $hotel = Hotel::findOrFail($id);
        return response()->json($hotel);
    }

    public function calculateTotalPrice(Request $request)
    {
        $request->validate([
            'checkin' => 'required|date',
            'checkout' => 'required|date|after:checkin',
            'numguests' => 'required|integer|min:1',
            'numrooms' => 'required|integer|min:1',
            'price_per_night' => 'required|numeric|min:0'
        ]);

        $checkin = Carbon::parse($request->input('checkin'));
        $checkout = Carbon::parse($request->input('checkout'));

        $interval = $checkin->diff($checkout);
        $duration = $interval->days;

        $totalprice = $duration * $request->input('numrooms') * $request->input('price_per_night')*$request->input('numguests') ;

        return response()->json([
            'duration' => $duration,
            'totalprice' => $totalprice,
        ]);
    }
    public function searchHotels(Request $request)
    {
        $destination = $request->input('destination');
        $hotels = Hotel::where('location', 'LIKE', '%' . $destination . '%')->get();
        return response()->json($hotels);
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
        $hotel = Hotel::findOrFail($id);

    $hotel->checkin = $request->input('checkin');
    $hotel->checkout = $request->input('checkout');
    $hotel->duration = $request->input('duration');
    $hotel->numguests = $request->input('numguests');
    $hotel->numrooms = $request->input('numrooms');
    $hotel->totalprice = $request->input('totalprice');

    $hotel->save();

        return response()->json(['message' => 'Hotel updated successfully', 'hotel' => $hotel]);
    }

    public function updatehotels(Request $request, $id)
{
    $hotel = Hotel::find($id);
    if (!$hotel) {
        return response()->json(['message' => 'Hotel not found'], 404);
    }

    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'rate' => 'required|numeric|min:1|max:5',
        'duration' => 'string|max:255',
        'hoteldetails' => 'required|string',
        'discount' => 'string',
        'price_per_night' => 'required|numeric|min:0',
        'trip_id' => 'required|integer|exists:trips,id',
    ]);

    $hotel->update($validatedData);

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('images', 'public');
        $hotel->image = $imagePath;
        $hotel->save();
    }

    return response()->json(['message' => 'Hotel updated successfully', 'hotel' => $hotel]);
}



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $hotel = Hotel::find($id);

        if (!$hotel) {
            return response()->json(['message' => 'Hotel not found'], 404);
        }
    
        $hotel->delete();
    
        return response()->json(['message' => 'Hotel deleted successfully'], 200);
    }
    
}
