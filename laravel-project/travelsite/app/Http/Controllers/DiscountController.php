<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $discount = Discount::latest()->first();
        return response()->json($discount);
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
            'value' => 'required|numeric|min:0|max:100',
        ]);

        $discount = Discount::create(['value' => $request->value]);
        return response()->json($discount);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Discount $discount)
    {
        return $discount->load('hotel');
    }

    public function update(Request $request, Discount $discount)
    {
        $request->validate([
            'hotel_id' => 'exists:hotels,id',
            'code' => 'string|max:255',
            'percentage' => 'numeric',
        ]);

        $discount->update($request->all());

        return response()->json($discount, 200);
    }

    public function destroy(Discount $discount)
    {
        $discount->delete();

        return response()->json(null, 204);
    }

}
