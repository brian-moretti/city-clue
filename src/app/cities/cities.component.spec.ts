import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CitiesComponent } from './cities.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { TeleportService } from '../services/teleport.service';
import { of, throwError } from 'rxjs';
import {
  TeleportCity,
  TeleportCityImages,
  TeleportCityScores,
  TeleportItems,
} from '../models/teleport.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;
  let teleportService: TeleportService;
  let error: HttpErrorResponse;
  let fakeEvent: KeyboardEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientTestingModule, FormsModule, KnobModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesComponent);
    teleportService = TestBed.inject(TeleportService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change inputSearch and notSearched', () => {
    component.reloadPage();
    expect(component.inputSearch).toBe('');
    expect(component.notSearched).toBeFalsy();
  });

  it('should return different colour on total score based on score itself', () => {
    let score: number = 0;
    let result = component.returnTotalScoreColour(score);
    expect(result).toEqual('red');
    score = 30;
    result = component.returnTotalScoreColour(score);
    fixture.detectChanges();
    expect(result).toEqual('orange');
    score = 60;
    result = component.returnTotalScoreColour(score);
    fixture.detectChanges();
    expect(result).toEqual('yellow');
    score = 90;
    result = component.returnTotalScoreColour(score);
    fixture.detectChanges();
    expect(result).toEqual('green');
  });

  it('should return different colour on scores', () => {
    let score: number = 0;
    let result = component.returnScoreColour(score);
    expect(result).toEqual('red');
    score = 3;
    result = component.returnScoreColour(score);
    fixture.detectChanges();
    expect(result).toEqual('orange');
    score = 6;
    result = component.returnScoreColour(score);
    fixture.detectChanges();
    expect(result).toEqual('yellow');
    score = 9;
    result = component.returnScoreColour(score);
    fixture.detectChanges();
    expect(result).toEqual('green');
  });

  it('should filter the city based on query', () => {
    let fakeQuery: string = '';
    component.filterCity(fakeQuery);
    expect(component.filteredCity).toEqual(component.citiesList);
    // filter method
  });

  it('should return and assign city images', () => {
    let fakeCity = '';
    const response: TeleportCityImages = {
      photos: [{ image: { web: '', mobile: '' } }],
    };
    spyOn(teleportService, 'getTeleportCityImages').and.returnValue(
      of(response)
    );
    component.getTeleportCityImages(fakeCity);
    expect(component.cityImages).toEqual(response);
  });

  it('should return and assign city scores', () => {
    let fakeCity = '';
    const response: TeleportCityScores = {
      categories: [
        {
          color: '',
          score_out_of_10: 0,
          name: '',
        },
      ],
      teleport_city_score: 0,
      summary: '',
    };
    spyOn(teleportService, 'getTeleportCityScores').and.returnValue(
      of(response)
    );
    component.getTeleportCityScores(fakeCity);
    expect(component.cityCategories).toEqual(response);
  });

  it('should return and assign city name', () => {
    let fakeCity = '';
    const response: TeleportCity = { continent: '', name: '', full_name: '' };
    spyOn(teleportService, 'getTeleportCity').and.returnValue(of(response));
    component.getTeleportCity(fakeCity);
    expect(component.notSearched).toBeTruthy();
    expect(component.errorFounded).toBeFalsy();
    expect(component.cityName).toBe(response.name);
    expect(component.cityFullName).toBe(response.full_name);
    expect(component.continentOfCity).toBe(response.continent);
  });

  it('handle city errors on getting their name', () => {
    error = new HttpErrorResponse({});
    let fakeCity = '';
    spyOn(teleportService, 'getTeleportCity').and.returnValue(
      throwError(() => error)
    );
    component.getTeleportCity(fakeCity);
    expect(component.notSearched).toBeFalsy();
    expect(component.errorFounded).toBeTruthy();
    expect(component.errorMessage).toBeDefined();
  });

  it('should return all the cities names', () => {
    const response: TeleportItems = {
      count: 0,
      _links: {
        ['ua:item']: [{ href: '', name: '' }],
      },
    };
    spyOn(teleportService, 'getTeleportCities').and.returnValue(of(response));
    component.getAllCities();
    response._links['ua:item'].map((info) =>
      expect(component.citiesList.push).toBeDefined()
    );
  });

  it('should assign the inputSearch variable to the button value name', () => {
    let fakecity = '';
    component.returnValue(fakecity);
    expect(component.inputSearch).toBe(fakecity);
  });

  it('should submit the input and call several methods', () => {
    spyOn(component, 'getTeleportCity');
    spyOn(component, 'getTeleportCityScores');
    spyOn(component, 'getTeleportCityImages');
    component.onSubmit();
    expect(component.getTeleportCity).toHaveBeenCalledWith(
      component.inputSearch
    );
    expect(component.getTeleportCityScores).toHaveBeenCalledWith(
      component.inputSearch
    );
    expect(component.getTeleportCityImages).toHaveBeenCalledWith(
      component.inputSearch
    );
    expect(component.inputSearch).toEqual('');
  });

  it('should handle keyboard event', () => {
    fakeEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    let spy = spyOn(component, 'btnNavigationCity');
    component.handleNavigationArrowBtn(fakeEvent);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(fakeEvent);
  });

  it('', fakeAsync(() => {
    fakeEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    spyOn(fakeEvent, 'preventDefault');
    component.btnNavigationCity(fakeEvent);
    expect(fakeEvent.preventDefault).toHaveBeenCalled();

    fakeEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    fixture.detectChanges();
    spyOn(fakeEvent, 'preventDefault');
    component.btnNavigationCity(fakeEvent);
    expect(fakeEvent.preventDefault).toHaveBeenCalled();
  }));

  it('', () => {
    fakeEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
  });
});
