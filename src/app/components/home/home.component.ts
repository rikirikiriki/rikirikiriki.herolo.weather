import { Component, OnInit } from '@angular/core';

import { ForecastService } from 'src/app/services/forecast.service';
import { LocationService } from 'src/app/services/location.service';

import {Forecast} from '../../interfaces/forecast.interface';
import {Location} from '../../interfaces/location.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  location: Location;
  forecasts: Forecast[];
  constructor(private _forecastService: ForecastService, private _loctionService: LocationService) { }

  async ngOnInit(): Promise<void> {
    const defaultLocation = "tel aviv";
    const locations = await this._loctionService.getLocation(defaultLocation).toPromise();
    console.log(locations[0]);
    this.location = locations[0];
    this.forecasts = await this._forecastService.getForecasts(this.location.Key).toPromise();
  }

}
