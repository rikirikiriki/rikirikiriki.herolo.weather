export interface Forecast{

    Date: Date;
    Temperature: {
        Value: number;
        Unit: string;
    };
    Description: string;  
}