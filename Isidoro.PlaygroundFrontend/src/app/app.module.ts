import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { providePrimeNG } from 'primeng/config';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';


import Aura from '@primeng/themes/aura';
import { ProductService } from '../services/product.service';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    ReactiveFormsModule,
    FormsModule
],
  providers: [
    ProductService,
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    providePrimeNG({theme: {preset: Aura, options: {darkModeSelector: '.app-dark'}}})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
