import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';

import { LandingComponent } from './landing.component';
import { HomeComponent } from './home/home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class LandingModule { }
