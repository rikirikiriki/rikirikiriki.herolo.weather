import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/interfaces/forecast.interface';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {

  constructor(private _forecastService: ForecastService) { }
  
  @Input() forecast: Forecast;

  ngOnInit(): void {
  }

  getDay(date: Date | string): string{
    const day = new Date(date).toDateString().substring(0, 3);
    return day;
  }

  private _setSelectedItem(element: HTMLElement): void{
    const selectedClassName = "selected";
    const selectedElements = document.querySelectorAll(`.${selectedClassName}`);
    selectedElements.forEach(e => e.classList.remove(selectedClassName));
    element.classList.add(selectedClassName);

  }

  forecastSelected(event: PointerEvent): void{
    this._forecastService.notifyForecastItemSelected(this.forecast);
    console.log(event);
    this._setSelectedItem(event.target as HTMLElement);
  }
}
