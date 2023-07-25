import { Component, OnInit } from '@angular/core';
import { TeleportService } from '../services/teleport.service';
import {
  TeleportCityImages,
  TeleportCityScores,
} from '../models/teleport.model';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  constructor(private teleport: TeleportService) {}

  inputSearch: string = 'los-angeles';
  buttonCityClicked: string = '';
  citiesList: string[] = [];
  filteredCity: string[] = [];
  cityFullName: string = '';
  continentOfCity: string = '';
  cityCategories: TeleportCityScores = {
    categories: [{ color: '', name: '', score_out_of_10: 0 }],
    summary: '',
    teleport_city_score: 0,
  };
  cityImages: TeleportCityImages = {
    photos: [{ image: { web: '', mobile: '' } }],
  };

  notSearched: boolean = true //false;

  ngOnInit(): void {
    this.getAllCities();

    this.getTeleportCity('los-angeles');
    this.getTeleportCityScores('los-angeles');
    this.getTeleportCityImages('los-angeles');

  }

  onSubmit() {
    this.inputSearch = this.inputSearch
      .split(' ')
      .join('-')
      .toLowerCase()
      .trim();
    this.notSearched = true;
    this.getTeleportCity(this.inputSearch);
    this.getTeleportCityScores(this.inputSearch);
    this.getTeleportCityImages(this.inputSearch);
    this.inputSearch = '';
  }

  returnValue(city: string) {
    this.inputSearch = city;
  }

  getAllCities() {
    this.teleport.getTeleportCities().subscribe({
      next: (data) => {
        data._links['ua:item'].map((info) => {
          this.citiesList.push(info.name);
        });
      },
    });
  }

  getTeleportCity(city: string) {
    this.teleport.getTeleportCity(city).subscribe({
      next: (data) => {
        this.cityFullName = data.full_name;
        this.continentOfCity = data.continent;
      },
    });
  }

  getTeleportCityScores(city: string) {
    this.teleport.getTeleportCityScores(city).subscribe({
      next: (data) => {
        this.cityCategories = data;
      },
    });
  }

  getTeleportCityImages(city: string) {
    this.teleport.getTeleportCityImages(city).subscribe({
      next: (data) => {
        this.cityImages = data;
      },
    });
  }

  filterCity(query: string) {
    this.filteredCity = this.citiesList;
    this.filteredCity = this.citiesList.filter((key) => {
      return key.toLowerCase().includes(query.toLowerCase());
    });
    if (!query) {
      this.filteredCity = [];
    }
    return;
  }
}
