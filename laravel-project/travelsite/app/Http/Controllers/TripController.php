<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Hotel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trips = Trip::all();
        return response()->json($trips);
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
        $validatedData = $request->validate([
            'destination' => 'required|string',
            // 'start_date' => 'date',
            // 'end_date' => 'date|after:start_date',
            // 'guests'=>'integer',
            // 'price' => 'numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('images', 'public');
        }

        // $start_date = new \DateTime($validatedData['start_date']);
        // $end_date = new \DateTime($validatedData['end_date']);
        // $duration = $start_date->diff($end_date)->days;
        // $totalPrice = $duration * $validatedData['price'];

        $trip = Trip::create([
            'destination' => $validatedData['destination'],
            // 'start_date' => $validatedData['start_date'],
            // 'end_date' => $validatedData['end_date'],
            // 'guests' => $validatedData['guests'],
            // 'price' => $validatedData['price'],
            'image'=>  $validatedData['image']
        ]);

        return response()->json([
            'trip' => $trip,
            // 'duration' => $duration,
            // 'total_price' => $totalPrice
        ]);
    }
    
    public function search(Request $request)
    {
        $destination = $request->query('destination');
        $trips = Trip::where('destination', 'like', '%' . $destination . '%')->get();

        return response()->json($trips);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    
    public function show(Trip $trip)
    {
        
    //     $trip = Trip::findOrFail($id);

    //     // to show hotels by id
    //     // $trip = Trip::with('hotels')->find($id);

    //    if (!$trip) {
    //         return response()->json(['message' => 'Trip not found'], 404);
    //     }
    //     return response()->json($trip);
    return $trip;
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
        $trip = Trip::find($id);
        if ($trip) {
            $validatedData = $request->validate([
                'destination' => 'sometimes|string',
                // 'start_date' => 'sometimes|date',
                // 'end_date' => 'sometimes|date',
                // 'price' => 'sometimes|numeric',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $validatedData['image'] = $request->file('image')->store('images', 'public');
            }

            $trip->update($validatedData);

            return response()->json($trip);
        } else {
            return response()->json(['message' => 'Trip not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $trip = Trip::find($id);
        if ($trip) {
            $trip->delete();
            return response()->json(['message' => 'Trip deleted successfully']);
        } else {
            return response()->json(['message' => 'Trip not found'], 404);
        }
    }
}
