import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mifosx-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2000', '2001', '2002', '2003', '2004', '2005', '2006'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [75, 49, 89, 31, 86, 35, 50], label: 'Series A'},
    {data: [48, 38, 65, 39, 66, 17, 80], label: 'Series B'}
  ];
  ngOnInit() {
  }
}
