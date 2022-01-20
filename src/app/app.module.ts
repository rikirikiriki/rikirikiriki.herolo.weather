import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { ForecastService } from './services/forecast.service';
import { SessionStorageService } from './services/session-storge.service';
import { LocationService } from './services/location.service';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { FavoriteItemComponent } from './components/favorite-item/favorite-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    WeatherDetailsComponent,
    WeatherListComponent,
    WeatherItemComponent,
    FavoriteListComponent,
    FavoriteItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [ 
    ForecastService,
    SessionStorageService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
