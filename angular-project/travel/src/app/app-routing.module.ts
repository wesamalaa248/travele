import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AddflightComponent } from './addflight/addflight.component';
import { AddhotelComponent } from './addhotel/addhotel.component';
import { GetflightComponent } from './getflight/getflight.component';
import { GethotelComponent } from './gethotel/gethotel.component';
import { AuthGuard } from './auth/auth.guard';
import { AddtripComponent } from './addtrip/addtrip.component';
import { GettripComponent } from './gettrip/gettrip.component';
import { AddhimagesComponent } from './addhimages/addhimages.component';
import { EdithotelsComponent } from './edithotels/edithotels.component';
import { EditflightComponent } from './editflight/editflight.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,data:{role:['user']}},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'flights',component:FlightsComponent},
  {path:'ticket',component:TicketComponent,},
  {path:'hotels',component:HotelsComponent},
  {path:'hoteldetails',component:HoteldetailsComponent},
  {path: 'hoteldetails/:id', component:HoteldetailsComponent},
  
  {path:'contactus',component:ContactusComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'booking',component:BookingComponent,},
  {path:'booking/:id',component:BookingComponent,},
  {path:'favourite',component:FavouriteComponent},

  {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard],data:{role:['admin']}},
  {path:'addflight',component:AddflightComponent,canActivate: [AuthGuard],data:{role:['admin']}},
  {path:'editflight/:id',component:EditflightComponent,canActivate: [AuthGuard],data:{role:['admin']}},
  {path:'getflight',component:GetflightComponent,canActivate: [AuthGuard],data:{role:['admin']}},
  {path:'addhotel',component:AddhotelComponent},
  {path:'gethotel',component:GethotelComponent},
  {path:'addtrip',component:AddtripComponent},
  {path:'gettrip',component:GettripComponent},
  {path:'himages',component:AddhimagesComponent},
  {path:'edithotel/:id',component:EdithotelsComponent},

  
  // show hotels related with trip
  {path:'hotels/:id',component:HotelsComponent } ,
  
  
  
  { path: '**', redirectTo: '/home' } // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
