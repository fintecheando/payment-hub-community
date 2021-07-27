import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mifosx-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

  constructor() { }

  ngOnInit() {
  }

}
