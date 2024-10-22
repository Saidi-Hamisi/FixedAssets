import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../types/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  public getLocations(): Observable<Location[]>{
    const locationsUrl = `${environment.BASE_URL}/api/location/locations`;

    return this.http.get<Location[]>(locationsUrl);
  }

  public addlocation(location):Observable<{message: string}>{
    const addLocationUrl = `${environment.BASE_URL}/api/location/addLocation`;

    return this.http.post<{message: string}>(addLocationUrl, location);
  }

  public updatelocation(location):Observable<{message: string}>{
    const updateLocationurl = `${environment.BASE_URL}/api/location/updateLocation`;

    return this.http.put<{message: string}>(updateLocationurl, location)
  }

  public deleteLocation(locationId): Observable<{message: string}>{
    const deleteLocationUrl = `${environment.BASE_URL}api/location/locations/${locationId}`;

    return this.http.delete<{message: string}>(deleteLocationUrl);
  }
}
