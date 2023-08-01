import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitiesRoutingModule } from './cities-routing.module';

import { KnobModule } from 'primeng/knob';

import { CitiesComponent } from './cities.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [CitiesComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, FormsModule, KnobModule, CitiesRoutingModule],
})
export class CitiesModule {}
