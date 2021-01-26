import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/_service/data.service'

export class Payment {
  name: String;
  preis: number;
  status: String;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  displayedColumns: string[] = ['name', 'preis', 'status', 'actions'];
  data: any;
  paymentInfoNew: any;
  paymentInfoData: any;
  paymentInfoId: any;
  dataSource = new MatTableDataSource(this.data);
  random1: number;
  random2: String;


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getPayments();
    this.getPaymentInfo();
  }

  getPayments() {
    this.dataService.getPayments().subscribe(actionArray => {
      this.data = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as unknown;
      })
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
    });
  }

  getPaymentInfo() {
    this.dataService.getPaymentInfo().subscribe(actionArray => {
      this.paymentInfoData = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as any;
      })
      if(this.paymentInfoData.length > 0){
        this.paymentInfoId = this.paymentInfoData[0].id
      }
      else{
        this.paymentInfoData = [{cnumber: null, emonth: null, eyear: null}]
      }
    });
  }

  deletePayment(id: string) {
    this.dataService.deletePayment(id);
  }

  deletePaymentInfo(id: string) {
    this.dataService.deletePaymentInfo(id);
  }

  createPaymentInfo() {
    if (this.paymentInfoNew.checked) {
      if(this.paymentInfoData.cnumber !== undefined){
        this.dataService.deletePaymentInfo(this.paymentInfoId)
        this.dataService.createPaymentInfo(this.paymentInfoNew);
      }
      else{
        this.dataService.createPaymentInfo(this.paymentInfoNew);
      }

    }
    else{
      this.paymentInfoData = [{cnumber: null, emonth: null, eyear: null}]
    }
  }


  payInvoice(x: string): void{
    this.data = { status: 'Bezahlt' }
        this.dataService.updatePayment(this.data, x);
        this.dataSource = new MatTableDataSource(this.data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generateData() {
    this.random1 = Math.floor(Math.random() * 600) + 100;
    this.random2 = Math.random().toString(36).slice(2)
    this.data = { name: 'Reperatur ' + this.random2, preis: this.random1, status: 'Offen' };
    this.dataService.createPayment(this.data);
  }
}

