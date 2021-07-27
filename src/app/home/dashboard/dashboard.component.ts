/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Dashboard component.
 */
@Component({
  selector: 'mifosx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {  }
  private query = new BehaviorSubject({
    measures: ["Orders.count"],
    timeDimensions: [{ dimension: "Orders.createdAt", granularity: "month", dateRange: "This year" }],
    dimensions: ["Orders.status"],
    filters: [{ dimension: "Orders.status", operator: "notEquals", values: ["completed"] }]
  });

  cards:any = [];

  ngOnInit() {
    this.query.subscribe(data => {
      this.cards[0] = {
        chart: "bar", cols: 2, rows: 1,
        query: data
      };
    });
  }

}

