import { Component, OnInit, ɵConsole } from "@angular/core";
import { Label, Color } from "ng2-charts";
import { DataService } from "src/app/_service/data.service";
import { database } from "firebase";
import { System } from "src/app/_components/add/system.model";
import { resolve } from "url";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { registerDialog } from "src/app/_components/dashboard/registerDialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "./../../shared/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  sensorData: [];
  emptyData: boolean = true;
  systems: any;
  data: any;
  datax: any;
  datay: any;
  paymentInfo: any;
  random1: number;
  random2: number;
  random3: number;
  isLoading: boolean;
  smallCards = [
    { name: "Kosten", value: 0, icon: "euro" },
    { name: "Verbrauch", value: 0, icon: "bar_chart" },
    { name: "Störungen", value: 0, icon: "error_outline" },
    { name: "Leckage", value: 0, icon: "waves" },
  ];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 20,
    scales: {
      yAxes: [
        {
          display: true,
          drawTicks: false,
          ticks: {
            min: 0,
            stepSize: 25,
          },
          gridLines: {
            color: "#f3f6f8",
          },
        },
      ],
      maxBarThickness: 1,
      xAxes: [
        {
          display: true,
          gridLines: {
            color: "#fff",
          },
          offsetGridLines: false,
        },
      ],
    },
  };
  public barChartLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [
    {
      data: [0, 0, 0, 0, 0, 0],
      label: "Letzte Woche",
      barThickness: 15,
      maxBarThickness: 12,
    },
    {
      data: [0, 0, 0, 0, 0, 0],
      label: "Aktuell",
      barThickness: 15,
      maxBarThickness: 12,
    },
  ];
  public barChartDataFuell = [
    {
      data: [19, 27, 36, 42, 57, 64],
      label: "Letzte Woche",
      barThickness: 15,
      maxBarThickness: 12,
    },
    {
      data: [72, 79, 89, 95, 0, 14],
      label: "Aktuell",
      barThickness: 15,
      maxBarThickness: 12,
    },
  ];
  public barChartColors: Color[] = [
    { backgroundColor: "#CCCCCC" },
    { backgroundColor: "#CC0000" },
  ];
  public barChartScale: {
    display: false;
  };
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            stepSize: 25,
          },
          gridLines: {
            color: "#f3f6f8",
          },
        },
      ],
      xAxes: [
        {
          display: true,
          gridLines: {
            color: "#fff",
          },
          offsetGridLines: false,
        },
      ],
    },
  };
  public lineChartLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  public lineChartType = "line";
  public lineChartLegend = true;
  public lineChartData = [
    { data: [0, 0, 0, 0, 0, 0], label: "Letzte Woche", fill: false },
    { data: [0, 0, 0, 0, 0, 0], label: "Aktuell", fill: false },
  ];
  public lineChartDataTemp = [
    { data: [23, 25, 26, 24, 26, 27], label: "Aktuell", fill: false },
  ];
  public lineChartColors: Color[] = [
    { borderColor: "#CCCCCC" },
    { borderColor: "#CC0000" },
  ];
  public lineChartScale: {
    display: false;
  };

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.getSystems();
    this.getData();
  }

  startCleaning() {
    this._snackBar.open("Reinigung wurde gestartet", "Okay", {
      duration: 4000,
    });
  }

  getPaymentInfo() {
    this.dataService.getPaymentInfo().subscribe((actionArray) => {
      this.paymentInfo = actionArray.map((item) => {
        return ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        } as unknown) as any;
      });
      if (this.paymentInfo.length == 0) {
        this.openRegisterDialog();
      }
    });
  }

  openRegisterDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(registerDialog, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.dataService.createAddressInformation(result[0].value);
        const currentTime = new Date();
        result[1].value.date = currentTime.toString();
        const status = "okay";
        result[1].value.status = status;
        this.dataService.createSystem(result[1].value);
        this.dataService.createPaymentInfo(result[2].value);
        this.dataService.createContractInfo(result[3]);
      }
    });
  }

  getSystems() {
    this.dataService.getSystems().subscribe((actionArray) => {
      this.systems = actionArray.map((item) => {
        return ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        } as unknown) as System;
      });
      if (this.systems.length == 0) {
        this.emptyData = true;
        this.isLoading = false;
      } else {
        this.emptyData = false;
        this.isLoading = false;
      }
    });
  }

  getData() {
    this.dataService.getData().subscribe((actionArray) => {
      this.data = actionArray.map((item) => {
        return ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        } as unknown) as any;
      });
      if (this.data.length != 0) {
        this.setData();
        console.log(this.data);
      }
    });
  }

  setData() {
    this.lineChartData = [
      { data: this.data[0].lastWeek1, label: "Letzte Woche", fill: false },
      { data: this.data[0].thisWeek1, label: "Aktuell", fill: false },
    ];
    this.barChartData = [
      {
        data: this.data[0].lastWeek2,
        label: "Letzte Woche",
        barThickness: 15,
        maxBarThickness: 12,
      },
      {
        data: this.data[0].thisWeek2,
        label: "Aktuell",
        barThickness: 15,
        maxBarThickness: 12,
      },
    ];
    this.smallCards[0].value = this.data[0].consumption;
    this.smallCards[1].value = this.data[0].costs;
    this.smallCards[2].value = this.data[0].difficulties;
    this.smallCards[3].value = this.data[0].number;
  }

  generateData() {
    if (this.data.length != 0) {
      this.dataService.deleteData(this.data[0].id);
    }
    this.random1 = Math.floor(Math.random() * 90) + 1;
    this.random2 = Math.floor(Math.random() * 90) + 1;
    this.random3 = Math.floor(Math.random() * 90) + 1;
    this.data = {
      consumption: this.random1,
      costs: this.random3,
      difficulties: 2,
      number: 0,
      thisWeek1: [
        this.random1 + 10,
        this.random2 + 5,
        this.random3 + 10,
        50,
        this.random1,
        40,
      ],
      lastWeek1: [
        this.random1,
        this.random2,
        60,
        this.random3,
        this.random1,
        40,
      ],
      thisWeek2: [
        this.random1 + 10,
        this.random2 + 5,
        this.random3 + 10,
        50,
        this.random1,
        40,
      ],
      lastWeek2: [
        this.random1,
        this.random2,
        60,
        this.random3,
        this.random1,
        40,
      ],
    };
    this.dataService.createData(this.data);
  }
}
