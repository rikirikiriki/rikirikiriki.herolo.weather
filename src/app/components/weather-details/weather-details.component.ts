import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/interfaces/forecast.interface';
import { Location } from 'src/app/interfaces/location.interface';
import { ForecastService } from 'src/app/services/forecast.service';
import { LocationService } from 'src/app/services/location.service';
import { SessionStorageService } from 'src/app/services/session-storge.service';
@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  @Input() forecasts: Forecast[];
  @Input() location: Location;
  city: string;
  locationId: number;
  todayWeather: Forecast;
  
  constructor(private _forecastService: ForecastService, private _locationService: LocationService, private _storageService: SessionStorageService) { }

  ngOnInit(): void {

    this.city = this.location.LocalizedName;
    this.locationId = +this.location.Key;
    this.todayWeather = this.forecasts[0];

    this._forecastService.forecastSelected$.subscribe((forecast: Forecast) => this.todayWeather = forecast);
    this._changeFavoriteButtonText();
  }

  changeFavorite(): void{
    this._toggleFavorite();
    this._changeFavoriteButtonText();
    this._updateLocationInStorage();  
  }

  private _toggleFavorite(): void{
    this.location.Favorite = !this.location.Favorite;
  }

  private _changeFavoriteButtonText(): void{
  
    const addToFavorite = "Add To Favorite";
    const removeFromFavorite = "Remove From Favorite";
    const heart = document.querySelector('#favoriteButton');
    heart.textContent = this.location.Favorite ? removeFromFavorite : addToFavorite;
  }

  private _updateLocationInStorage():void{
    const key = this._locationService.getLoctionStorageKey();
    this._storageService.saveDataToSession<Location[]>(key, [this.location]); 
  }

  applyStyle(){
    const heart = document.querySelector('#heart');
    heart.classList.toggle("heart");
  }
  
    
}