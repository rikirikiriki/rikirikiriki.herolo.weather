import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/interfaces/forecast.interface';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {

  constructor() { }

  @Input() forecasts: Forecast[];

  ngOnInit(): void {
  }

}
