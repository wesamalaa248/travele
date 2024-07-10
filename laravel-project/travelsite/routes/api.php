<?php
use App\Http\Controllers\UserController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\HotelImageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\ContactFormController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



// users
Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'getUser']);
});

// flights
Route::post('/addflight', [FlightController::class, 'store']);
Route::get('/flights', [FlightController::class, 'index']);
Route::post('/flights/search', [FlightController::class, 'search']);
Route::get('/flights/{id}', [FlightController::class, 'show']);
Route::put('/flights/{id}/details', [FlightController::class, 'updateDetails']);

Route::post('/flights/{id}', [FlightController::class, 'updateFlight']);
Route::delete('/flights/{id}', [FlightController::class, 'destroy']);
//hotels
Route::post('/addhotel', [HotelController::class, 'store']);
Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);
Route::post('/hotel-images',[HotelImageController::class, 'store']);
Route::post('/hotels/calculate-price', [HotelController::class, 'calculateTotalPrice']);
Route::post('/search-hotels', [HotelController::class, 'searchHotels']);
Route::get('hotels-with-discount', [HotelController::class, 'getHotelsWithDiscount']);
Route::get('/hotels/trip/{tripId}', [HotelController::class, 'getHotelsByTrip']);
Route::get('/hotels/discounts', [HotelController::class, 'getHotelsWithDiscounts']);
Route::delete('/hotels/{id}', [HotelController::class, 'destroy']);
// Route::put('/hotels', [HotelController::class, 'updateHotels']);
Route::put('/hotels/{id}', [HotelController::class, 'update']);
Route::post('/hotels/{id}', [HotelController::class, 'updatehotels']);

//trips
Route::post('/trips', [TripController::class, 'store']);
Route::get('/trips/search', [TripController::class, 'search']);
Route::get('/hotels/search', [HotelController::class, 'search']);

Route::get('/trips', [TripController::class, 'index']);
Route::get('/trips/{id}', [TripController::class, 'show']);
Route::put('/trips/{id}', [TripController::class, 'update']);
Route::delete('/trips/{id}', [TripController::class, 'destroy']);

//reviews
Route::get('/hotels/{hotel_id}/reviews', [ReviewController::class, 'index']);
Route::post('/hotels/{hotel_id}/addreview', [ReviewController::class, 'store']);
//contact form
Route::get('send-test-email', [App\Http\Controllers\TestEmailController::class, 'sendTestEmail']);
Route::post('contact-us', [ContactFormController::class, 'store'])->name('contact.us.store');
Route::get('/contacts/{id}', [ContactFormController::class, 'show'])->name('contacts.show');

//discount
Route::get('/getdiscount', [DiscountController::class, 'index']);
Route::post('/discount', [DiscountController::class, 'store']);

//booking
Route::post('bookings', [BookingController::class, 'store']);

