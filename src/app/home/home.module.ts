/** Angular Imports */
import { NgModule } from '@angular/core';

/** Custom Modules */
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

/** Custom Components */
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CountUpModule } from 'ngx-countup';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { KpiCardComponent } from './dashboard/kpi-card/kpi-card.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './dashboard/bar-chart/bar-chart.component';
import { StatusCardComponent } from './dashboard/status-card/status-card.component';

/**
 * Home Component
 *
 * Home and dashboard components should be declared here.
 */
@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    CountUpModule,
    MatProgressBarModule,
    ChartsModule
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    KpiCardComponent,
    BarChartComponent,
    StatusCardComponent
  ]
})
export class HomeModule { }
