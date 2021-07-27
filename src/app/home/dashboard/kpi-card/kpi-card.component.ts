import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'mifosx-kpi-card',
    templateUrl: './kpi-card.component.html',
    styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements OnInit {

    @Input() title: string;
    @Input() type: string;
    @Input() on = true;
  
    constructor() { }
  
    ngOnInit() {
    }

}