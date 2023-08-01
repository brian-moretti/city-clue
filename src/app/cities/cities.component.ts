import { Component, HostListener, OnInit } from '@angular/core';
import { TeleportService } from '../services/teleport.service';
import {
  TeleportCityImages,
  TeleportCityScores,
} from '../models/teleport.model';
import { delay, fromEvent } from 'rxjs';
import { ErrorsService } from '../services/errors.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  constructor(
    private teleport: TeleportService,
    private handleError: ErrorsService
  ) {}

  inputSearch: string = '';
  selectedCity: number = -1;

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

  notSearched: boolean = false;
  errorMessage: string = '';
  errorFounded: boolean = false;

  ngOnInit(): void {
    this.getAllCities();
  }

  onSubmit() {
    this.inputSearch = this.inputSearch
      .split(' ')
      .join('-')
      .toLowerCase()
      .trim();
    this.getTeleportCity(this.inputSearch);
    this.getTeleportCityScores(this.inputSearch);
    this.getTeleportCityImages(this.inputSearch);
    this.inputSearch = '';
  }

  @HostListener('keydown', ['$event'])
  handleNavigationArrowBtn(event: KeyboardEvent) {
    this.btnNavigationCity(event);
  }

  btnNavigationCity(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const step = event.key === 'ArrowUp' ? -1 : 1;
      const maxIndex = this.filteredCity.length - 1;
      let nextTab = this.selectedCity + step;

      if (nextTab < 0) {
        nextTab = maxIndex;
      } else if (nextTab > maxIndex) {
        nextTab = 0;
      }

      this.selectedCity = nextTab;

      //! Soluzione con setTimeout
      /*      setTimeout(() => {
        const button = document.querySelector(
          'button[tabindex="0"]'
        ) as HTMLButtonElement;
        console.log(
          button,
          this.selectedCity,
          nextTab,
          button.hasAttribute('tabindex')
        );

        if (button) {
          button.focus();
        }
      }, 50); */

      //! Soluzione in rxJS
      //? fromEvent prende il target e il tipo di evento
      //? .pipe(filter... verifica che ci siano dei pulsanti [opzioonale]
      //? delay applica un ritardo async di 50ms al successivo subscribe con il codice
      //? genera un observable invece di un async function
      fromEvent(document, 'keydown')
        .pipe(delay(50))
        .subscribe(() => {
          const button = document.querySelector(
            'button[tabindex="0"]'
          ) as HTMLButtonElement;
          if (button) {
            button.focus();
          }
        });
    }
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
        this.notSearched = true;
        this.errorFounded = false;
        this.cityFullName = data.full_name;
        this.continentOfCity = data.continent;
      },
      error: () => {
        this.errorMessage = this.handleError.handleAPIErrors();
        this.errorFounded = true;
        this.notSearched = false;
      },
    });
  }

  getTeleportCityScores(city: string) {
    this.teleport.getTeleportCityScores(city).subscribe({
      next: (data) => {
        this.cityCategories = data;

        this.cityCategories.categories.forEach((score) => {
          score.score_out_of_10 = Number(score.score_out_of_10.toFixed(1));
        });

        this.cityCategories.teleport_city_score =
          +this.cityCategories.teleport_city_score.toFixed(1);
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
      this.selectedCity = -1;
    }
    return;
  }

  returnScoreColour(score: number): string {
    if (score <= 2.5) {
      return 'red';
    } else if (score > 2.5 && score <= 5) {
      return 'orange';
    } else if (score > 5 && score <= 7.5) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  returnTotalScoreColour(score: number): string {
    if (score <= 25) {
      return 'red';
    } else if (score > 25 && score <= 50) {
      return 'orange';
    } else if (score > 50 && score <= 75) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  reloadPage() {
    this.inputSearch = '';
    this.notSearched = false;
  }
}
