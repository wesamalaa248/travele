<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flight;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $flights = Flight::all();
        return response()->json($flights);
    }
    
    public function search(Request $request)
    {
        $criteria = $request->only(['leavingFrom', 'goingTo', 'departDate','classType']);
        
        $flights = Flight::query()
            ->when($criteria['leavingFrom'], function ($query, $leavingFrom) {
                return $query->where('departure_airport', 'like', "%$leavingFrom%");
            })
            ->when($criteria['goingTo'], function ($query, $goingTo) {
                return $query->where('arrival_airport', 'like', "%$goingTo%");
            })
            ->when($criteria['departDate'], function ($query, $departDate) {
                return $query->whereDate('departure_time', $departDate);
            })
            ->when(empty($criteria['leavingFrom']) && empty($criteria['goingTo']) && !empty($criteria['departDate']), function ($query) use ($criteria) {
                // When only departDate is provided, filter by departure_time
                return $query->whereDate('departure_time', $criteria['departDate']);
            })
            ->when($criteria['classType'], function ($query, $classType) {
                return $query->where('travel_class', $classType);
            })
            ->get();

        return response()->json($flights);
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
            'airline' => 'required|string',
            'flight_number' => 'required|string',
            'departure_airport' => 'required|string',
            'departure_time' => 'required|date',
            'arrival_airport' => 'required|string',
            'arrival_time' => 'required|date',
            'price' => 'required|numeric',
            'travel_class' => 'required|string',
            'duration' => 'required|integer',
            'trip_id' => 'nullable|exists:trips,id',
            'airline_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // Validate image
        ]);

        // Handle image upload if provided
        if ($request->hasFile('airline_image')) {
            $validatedData['airline_image'] = $request->file('airline_image')->store('images', 'public');
        }

        $flight = Flight::create($validatedData);

        return response()->json(['message' => 'Flight added Successfully', 'flight' => $flight], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $flight = Flight::findOrFail($id);
        return response()->json($flight);
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
//     public function update(Request $request, $id)
// {
//     $flight = Flight::findOrFail($id);

//     // Validate the request data
//     $validatedData = $request->validate([
//         'airline' => 'required|string',
//         'flight_number' => 'required|string',
//         'departure_airport' => 'required|string',
//         'departure_time' => 'required|date',
//         'arrival_airport' => 'required|string',
//         'arrival_time' => 'required|date',
//         'price' => 'required|numeric',
//         'travel_class' => 'required|string',
//         'duration' => 'required|integer',
//         'trip_id' => 'nullable|exists:trips,id',
//         'airline_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // Validate image
//     ]);

//     // Update the flight details
//     $flight->airline = $validatedData['airline'];
//     $flight->flight_number = $validatedData['flight_number'];
//     $flight->departure_airport = $validatedData['departure_airport'];
//     $flight->departure_time = $validatedData['departure_time'];
//     $flight->arrival_airport = $validatedData['arrival_airport'];
//     $flight->arrival_time = $validatedData['arrival_time'];
//     $flight->price = $validatedData['price'];
//     $flight->travel_class = $validatedData['travel_class'];
//     $flight->duration = $validatedData['duration'];
//     $flight->trip_id = $validatedData['trip_id'];

//     // Handle image upload if provided
//     if ($request->hasFile('airline_image')) {
//         // Store the new image and update the flight's airline_image field
//         $flight->airline_image = $request->file('airline_image')->store('images', 'public');
//     }

//     // Save the updated flight details
//     $flight->save();

//     return response()->json($flight, 200);
// }
public function updateFlight(Request $request, $id)
{
    $flight = Flight::find($id);
    if (!$flight) {
        return response()->json(['message' => 'Flight not found'], 404);
    }

    $validatedData = $request->validate([
        'airline' => 'required|string|max:255',
        'departure_time' => 'required|date',
        'arrival_time' => 'required|date',
        'departure_airport' => 'required|string|max:255',
        'arrival_airport' => 'required|string|max:255',
        'duration' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
    ]);

    $flight->update($validatedData);

    if ($request->hasFile('airline_image')) {
        $imagePath = $request->file('airline_image')->store('images', 'public');
        $flight->airline_image= $imagePath;
        $flight->save();
    }

    return response()->json(['message' => 'Flight updated successfully', 'flight' => $flight]);
}


    
    public function updateDetails(Request $request, $id)
    {
        $flight = Flight::findOrFail($id);

        $validatedData = $request->validate([
            'travel_class' => 'required|string',
            'price' => 'required|numeric'
        ]);

        $flight->update($validatedData);

        return response()->json($flight, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $flight = Flight::find($id);

        if (!$flight) {
            return response()->json(['message' => 'Flight not found'], 404);
        }
    
        $flight->delete();
    
        return response()->json(['message' => 'Flight deleted successfully'], 200);
    }
}
