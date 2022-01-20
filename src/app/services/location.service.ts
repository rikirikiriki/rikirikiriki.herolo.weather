import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {tap, map} from 'rxjs/operators';
import config from '../../assets/config/config.json';

import {Location} from '../interfaces/location.interface';
import { SessionStorageService } from "./session-storge.service";

import { StoredLocation } from "../interfaces/stored-location.interface";




@Injectable() 
export class LocationService{


    constructor(private _httpClient: HttpClient, private _storageService: SessionStorageService){}

    private _location: string;

    getLocation(location: string): Observable<Location[]>{
        this._location = location.toLowerCase();

        let locations =  this._storageService.getDataFromSession<StoredLocation[]>(this._storageService.storedLocationsKey);

        if(locations){
           
           for (let storedLocation of locations) {
               if (location.toLowerCase().includes(storedLocation.locationPrefix.toLowerCase())) {
                   const foundLocations: Location[] = storedLocation.locations.filter((l: Location) =>  l.LocalizedName.toLowerCase().includes(location.toLowerCase()));
                    if(foundLocations && foundLocations.length > 0){
                        return of(foundLocations);
                    } 
               }
           }
        }
       
        const params = new HttpParams()
            .set("apikey", config.apiKey)
            .set("q", location)
            .set("language","en-us");
        return this._httpClient.get(config.locationAutocompelteurl, {params})
            .pipe(map((response: any) => response.map(item => ({...item, "Favorite": false}))))
            .pipe(tap((response: Location[]) => {
                if(response && response.length > 0){
                    locations = locations || [];
                    const newLocation: StoredLocation = {locationPrefix : location.toLowerCase().substring(0, 3), locations : response };
                    locations.push(newLocation);
                    this._storageService.saveDataToSession<StoredLocation[]>(this._storageService.storedLocationsKey , locations);
                }           
            }));
    }

    getLoctionStorageKey(): string{
        return `location_${this._location}`;

    }
}