import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Routing
import { AdminRoutingModule } from './admin-routing.module';

//Paages
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
