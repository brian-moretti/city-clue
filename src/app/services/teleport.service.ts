import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeleportCity, TeleportCityImages, TeleportCityScores, TeleportItems } from '../models/teleport.model';

@Injectable({
  providedIn: 'root',
})
export class TeleportService {
  constructor(private http: HttpClient) {}

  getTeleportCities(): Observable<TeleportItems> {
    return this.http
      .get<TeleportItems>('https://api.teleport.org/api/urban_areas/')
      .pipe();
  }

  getTeleportCity(city: string): Observable<TeleportCity> {
    return this.http.get<TeleportCity>(
      `https://api.teleport.org/api/urban_areas/slug:${city}/`
    );
  }

  getTeleportCityScores(city: string): Observable<TeleportCityScores> {
    return this.http.get<TeleportCityScores>(
      `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
    );
  }

  getTeleportCityImages(city: string): Observable<TeleportCityImages> {
    return this.http.get<TeleportCityImages>(
      `https://api.teleport.org/api/urban_areas/slug:${city}/images/`
    );
  }

  getTeleportCityCities() {
    return this.http.get(
      'https://api.teleport.org/api/urban_areas/slug:los-angeles/cities/'
    );
  }
}
