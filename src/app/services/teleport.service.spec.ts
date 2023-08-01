import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TeleportService } from './teleport.service';
import {
  TeleportCity,
  TeleportCityImages,
  TeleportCityScores,
  TeleportItems,
} from '../models/teleport.model';
import { ErrorsService } from './errors.service';

describe('TeleportService', () => {
  let service: TeleportService;
  let error: ErrorsService;
  let controller: HttpTestingController;
  let fakeTeleportItems: TeleportItems;
  let fakeTeleportCity: TeleportCity;
  let fakeTeleportCityScores: TeleportCityScores;
  let fakeTeleportCityImages: TeleportCityImages;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TeleportService);
    error = TestBed.inject(ErrorsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call the api and get the requested city', () => {
    let fakeCity: string = '';
    fakeTeleportCity = { name: '', continent: '', full_name: '' };
    service.getTeleportCity(fakeCity).subscribe((response) => {
      expect(response).toEqual(fakeTeleportCity);
    });
    const mockReq = controller.expectOne(
      `${service.teleportAPICity}${fakeCity}/`
    );
    expect(mockReq.request.method).toEqual('GET');
  });

  it('call the api and get all the cities', () => {
    fakeTeleportItems = {
      count: 0,
      _links: {
        ['ua:item']: [{ href: '', name: '' }],
      },
    };
    service.getTeleportCities().subscribe((response) => {
      expect(response).toEqual(fakeTeleportItems);
    });
    const mockReq = controller.expectOne(`${service.teleportAPI}`);
    expect(mockReq.request.method).toEqual('GET');
  });

  it("call the api and get the city's scores", () => {
    let fakeCity: string = '';
    fakeTeleportCityScores = {
      teleport_city_score: 0,
      summary: '',
      categories: [{ color: '', score_out_of_10: 0, name: '' }],
    };
    service.getTeleportCityScores(fakeCity).subscribe((response) => {
      expect(response).toEqual(fakeTeleportCityScores);
    });
    const mockReq = controller.expectOne(
      `${service.teleportAPICity}${fakeCity}/scores/`
    );
    expect(mockReq.request.method).toEqual('GET');
  });

  it("call the api and get city's images", () => {
    let fakeCity: string = '';
    fakeTeleportCityImages = { photos: [{ image: { mobile: '', web: '' } }] };
    service.getTeleportCityImages(fakeCity).subscribe((response) => {
      expect(response).toEqual(fakeTeleportCityImages);
    });
    const mockReq = controller.expectOne(
      `${service.teleportAPICity}${fakeCity}/images/`
    );
    expect(mockReq.request.method).toEqual('GET');
  });
});
