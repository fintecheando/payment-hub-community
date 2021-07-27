import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mifosx-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.scss']
})
export class JournalEntriesComponent implements OnInit {
  
  journalData: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Id', 'Tipo', 'Cuenta', 'Cargo', 'Abono'];
  /**
   * Retrieves the roles data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */

  /** Sorter for roles and permissions table. */
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute) { 
    this.route.data.subscribe(( data: { journal: any }) => {
      this.journalData = data.journal;
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.journalData);
    this.dataSource.sort = this.sort;
  }

}
