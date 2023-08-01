import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  TeleportCity,
  TeleportCityImages,
  TeleportCityScores,
  TeleportItems,
} from '../models/teleport.model';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class TeleportService {
  constructor(private http: HttpClient, private handleErrors: ErrorsService) {}

  teleportAPI: string = environment.teleportAPI;
  teleportAPICity: string = environment.teleportAPI + 'slug:';

  getTeleportCities(): Observable<TeleportItems> {
    return this.http
      .get<TeleportItems>(this.teleportAPI)
      .pipe(catchError(this.handleErrors.handleHTTPErrors));
  }

  getTeleportCity(city: string): Observable<TeleportCity> {
    return this.http
      .get<TeleportCity>(`${this.teleportAPICity}${city}/`)
      .pipe(catchError(this.handleErrors.handleHTTPErrors));
  }

  getTeleportCityScores(city: string): Observable<TeleportCityScores> {
    return this.http
      .get<TeleportCityScores>(`${this.teleportAPICity}${city}/scores/`)
      .pipe(catchError(this.handleErrors.handleHTTPErrors));
  }

  getTeleportCityImages(city: string): Observable<TeleportCityImages> {
    return this.http
      .get<TeleportCityImages>(`${this.teleportAPICity}${city}/images/`)
      .pipe(catchError(this.handleErrors.handleHTTPErrors));
  }
}
