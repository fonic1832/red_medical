import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchService } from './core/services/search.service';
import { AppRoutingModule } from './app.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from './core/layout/layout.module';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { StackOverflowQuestionsComponent } from './dashboard/stack-overflow-questions/stack-overflow-questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { NumberPipe } from 'app/core/pipes/number.pipe';
import { WeatherComponent } from './dashboard/weather/weather.component';
import { WeatherService } from 'app/core/services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchComponent,
    StackOverflowQuestionsComponent,
    NumberPipe,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [SearchService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
