import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FlightsComponent } from './flights/flights.component';
import { TicketComponent } from './ticket/ticket.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HoteldetailsComponent } from './hoteldetails/hoteldetails.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BookingComponent } from './booking/booking.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiService } from './services/api.service';
import { AddhotelComponent } from './addhotel/addhotel.component';
import { AddflightComponent } from './addflight/addflight.component';
import { GetflightComponent } from './getflight/getflight.component';
import { GethotelComponent } from './gethotel/gethotel.component';
import { JwtModule } from '@auth0/angular-jwt';
import { TimeFormatPipe } from './time-format.pipe';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AddtripComponent } from './addtrip/addtrip.component';
import { GettripComponent } from './gettrip/gettrip.component';
import { AddhimagesComponent } from './addhimages/addhimages.component';
import { EdithotelsComponent } from './edithotels/edithotels.component';
import { EditflightComponent } from './editflight/editflight.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FlightsComponent,
    TicketComponent,
    HotelsComponent,
    HoteldetailsComponent,
    ContactusComponent,
    AboutusComponent,
    BookingComponent,
    FavouriteComponent,
    DashboardComponent,
    AddhotelComponent,
    AddflightComponent,
    GetflightComponent,
    GethotelComponent,
    TimeFormatPipe,
    AddtripComponent,
    GettripComponent,
    AddhimagesComponent,
    EdithotelsComponent,
    EditflightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8000'], // Adjust this to your API domain
        disallowedRoutes: ['http://localhost:8000/api/login']
      }
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
