
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {tap, map} from 'rxjs/operators';

import { Forecast } from '../interfaces/forecast.interface';
import config from '../services/config.service' ;
import { SessionStorageService } from './session-storge.service';



@Injectable()
export class ForecastService {
    
    private _forecastSelected  = new Subject<Forecast>();
    forecastSelected$: Observable<Forecast> = this._forecastSelected.asObservable();

    constructor(private _httpClient: HttpClient, private _storageService: SessionStorageService){}
    
    getForecasts(location: string): Observable<Forecast[]>{
        const sessionStorageKey = `forecast_${location}`;
        const forecasts = this._storageService.getDataFromSession<Forecast[]>(sessionStorageKey);

        if(forecasts) return of(forecasts);

        const params = new HttpParams()
            .set("apikey", config.apiKey)
            .set("language", "en-us")
            .set("details", "true")
            .set("metric", "true");
        return this._httpClient.get(`${config.forecastApiFiveDaysUrl}/${location}`, {params})
            .pipe(map((response: any) => response["DailyForecasts"].map(item => {
                return {
                   "Date" : item.Date,
                   "Temperature" : {
                     "Value": item.Temperature.Maximum.Value,
                     "Unit": item.Temperature.Maximum.Unit
                   },
                   "Description": item.Day.LongPhrase
                }
            })))
            .pipe(tap((forecasts: Forecast[]) => {            
                this._storageService.saveDataToSession<Forecast[]>(sessionStorageKey, forecasts)
            })
        );
    }

    notifyForecastItemSelected(forecast: Forecast): void{
        this._forecastSelected.next(forecast);
    }
}