import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mifosx-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChart1Labels = ['Canal SPEI', 'Canal SPID', 'Canal TEF'];
  public barChart1Type = 'bar';
  public barChart1Legend = true;
  public barChart1Data = [
    {data: [75, 49, 89], label: 'Transacciones Entrada'},
    {data: [48, 38, 65], label: 'Transacciones Salida'}
  ];

  public barChart2Labels = ['Aceptadas', 'Rechazadas', 'Completadas', 'Fallidas'];
  public barChart2Type = 'bar';
  public barChart2Legend = true;
  public barChart2Data = [
    {data: [90, 9, 73, 8], label: 'Transacciones Entrada'},
    {data: [48, 0, 46, 2], label: 'Transacciones Salida'}
  ];

  ngOnInit() {
  }
}
