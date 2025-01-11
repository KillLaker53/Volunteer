import { Location } from "../types/types";
import { OPENCAGE_API_KEY } from "../constants";
import OpenCage  from 'opencage-api-client';

export const geocodeLocation = async(address: string):Promise<Location> => {
    try{
        console.log(address);
        const response = await OpenCage.geocode({
                q: address, 
                key: OPENCAGE_API_KEY,
                countrycode: 'bg',
                limit: 1,
        });
        if(response.results && response.results.length > 0){
            const result = response.results[0];

            const coordinates: [number, number] = [result.geometry.lat, result.geometry.lng]
            const location: Location = {
                type: 'Point',
                coordinates: coordinates,
            }
            return location;
        } else{
            throw new Error("Location not found");
        }

    }catch(err){
        throw new Error("Error fetching the address to a location");
    }
}