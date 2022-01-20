import { Injectable } from "@angular/core";


@Injectable()
export class SessionStorageService{

    get storedLocationsKey(){ return "locations"};

    saveDataToSession<T>(key: string, data: T): void{
        sessionStorage.setItem(key, JSON.stringify(data));
        
    }

    getDataFromSession<T>(key: string): T {
        const data: T = JSON.parse(sessionStorage.getItem(key)); 
        return data; 
    }
}