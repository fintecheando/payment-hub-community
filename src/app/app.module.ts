/** Angular Imports */
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

/** Tanslation Imports */
import {TranslateModule, TranslateService, TranslateLoader} from '@ngx-translate/core';
import { HttpLoaderFactory } from './translation.config';
import { CustomMatPaginatorIntl } from './custom-mat-paginator-intl';

/** Chart Imports */
import { NgxChartsModule } from '@swimlane/ngx-charts';

/** Environment Configuration */
import { environment } from 'environments/environment';

/** Main Component */
import { WebAppComponent } from './web-app.component';

import { HttpService } from './core/http/http.service';

import { MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';

/** Not Found Component */
import { NotFoundComponent } from './not-found/not-found.component';

/** Load config dynamically */
import { AppConfig } from './app.config';

/** Custom Modules */
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SettingsModule } from './settings/settings.module';
import { SystemModule } from './system/system.module';
import { UsersModule } from './users/users.module';
import { PaymentHubModule } from './payment-hub/paymenthub.module';

/** Main Routing Module */
import { AppRoutingModule } from './app-routing.module';
import { MatPaginatorIntl } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

export function initConfig(config: AppConfig) {
  return () => config.load();
}

/**
 * App Module
 *
 * Core module and all feature modules should be imported here in proper order.
 */
@NgModule({
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    }),
    NgxChartsModule,
    CoreModule,
    HomeModule,
    LoginModule,
    SettingsModule,
    SystemModule,
    UsersModule,
    PaymentHubModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [TranslateModule],
  declarations: [WebAppComponent, NotFoundComponent],
  providers: [AppConfig,
    DatePipe,
    HttpService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ AppConfig, TranslateService, Injector ],
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
  ],
  bootstrap: [WebAppComponent]
})
export class AppModule { }
