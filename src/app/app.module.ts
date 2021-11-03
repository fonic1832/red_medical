import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchService } from './core/services/search.service';
import { AppRoutingModule } from './app.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from './core/layout/layout.module';
import { SearchComponent } from './search/search.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StackOverflowQuestionsComponent } from './dashboard/stack-overflow-questions/stack-overflow-questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { NumberPipe } from 'app/core/pipes/number.pipe';
import { WeatherComponent } from './dashboard/weather/weather.component';
import { WeatherService } from 'app/core/services/weather.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function httpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// we want to wait for the translate service to have received the translations at app start so that .instant works directly
export function appInitializerFactory(translateService: TranslateService, injector: Injector): () => Promise<any> {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized: Promise<any> = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translateService.setDefaultLang('en');
      translateService.use('en').subscribe(() => resolve(null));
    });
  });
}

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
    MatTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    SearchService,
    WeatherService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
