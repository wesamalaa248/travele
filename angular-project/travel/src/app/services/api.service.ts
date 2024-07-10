import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

// flights
  addFlight(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/addflight`, userData);
  }
  getFlights(): Observable<any> {
    return this.http.get(`${this.apiUrl}/flights`);
  }
  getFlight(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/flights/${id}`);
  }
  searchFlights(criteria: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/flights/search`, criteria);
  }
  updateFlightDetails(id: number, flightDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/flights/${id}/details`, flightDetails);
  }
  
  updateFlight(id: number, userData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/flights/${id}`, userData);
  }
  deleteFlight(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/flights/${id}`);
  }
  //hotels
  addHotel(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/addhotel`, userData);
  }
  getHotels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels`);
  }
  deleteHotel(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hotels/${id}`);
  }
  
//for get hotels detail by hotel id
  getHotelDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels/${id}`);
  }
  
  updateHotelDetails(hotelId: number, updatedDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/hotels/${hotelId}`, updatedDetails);
  }

  calculateTotalPrice(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hotels/calculate-price`, data);
  }
  searchHotels(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/search-hotels`, data);
  }
  updateHotels(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/hotels`, data);
  }
  updateHotel(id: number, hotel: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotels/${id}`, hotel);
  }
  getHotelsWithDiscount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels-with-discount`);
  }
  
//trips
addTrip(trip: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/trips`, trip);
}
  searchTrips(destination: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/search`,{ params: { destination }});
}
  //for show trips in select  and home page
  getTrips(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trips`);
  }
  getTripById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trips/${id}`);
  }
  getHotelsByTrip(tripId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hotels/trip/${tripId}`);
  }
// reviews
addReview(hotelId: number, reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotels/${hotelId}/addreview`, reviewData);
}
getReviews(hotelId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels/${hotelId}/reviews`);
}
//booking
createBooking(bookingDetails: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/bookings`, bookingDetails);
}
//discount
getDiscount(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getdiscount`);
}

setDiscount(discountValue: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/discount`, { value: discountValue });
}

uploadImages(hotelId: number, images: File[]): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('hotel_id', hotelId.toString());
  images.forEach((image, index) => {
    formData.append(`images[${index}]`, image, image.name);
  });

  return this.http.post(`${this.apiUrl}/hotel-images`, formData);
}

}
