<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HotelImage;
use Illuminate\Support\Facades\Log;

class HotelImageController extends Controller
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
    public function store(Request $request)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'hotel_id' => 'required|exists:hotels,id',
        ]);

        $uploadedImages = [];

        // if ($request->hasFile('images')) {
        //     // Store the image in the 'public/images' directory
        //     $imagePath = $request->file('image')->store('images', 'public');
            
        //     // Create a new HotelImage record and save to database
        //     $hotelImage = HotelImage::create([
        //         'image' => $imagePath,
        //         'hotel_id' => $request->hotel_id,
        //     ]);

        //     // Return a successful response
        //     return response()->json(['message' => 'Image uploaded successfully', 'data' => $hotelImage], 201);
        // }

        // // Return an error response if the image upload fails
        // return response()->json(['message' => 'Image upload failed'], 400);
        
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('images', 'public');
                $hotelImage = HotelImage::create([
                    'image' => $imagePath,
                    'hotel_id' => $request->hotel_id,
                ]);
                $uploadedImages[] = $hotelImage;
            }

            return response()->json(['message' => 'Images uploaded successfully', 'data' => $uploadedImages], 201);
        }

        return response()->json(['message' => 'Image upload failed'], 400);
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
