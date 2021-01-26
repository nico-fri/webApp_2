import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  distance: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Reparatur Service 1', distance: 2 },
  { position: 2, name: 'Reparatur Service 2', distance: 5 },
  { position: 3, name: 'Reparatur Service 3', distance: 10 },
];


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'distance'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }


  doOrder() {
    this._snackBar.open("Dienstleister wurde beauftragt.", "Okay", {
      duration: 4000,
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
