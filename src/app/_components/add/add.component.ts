import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "src/app/_service/data.service";
import { System } from "src/app/_components/add/system.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { addDialog } from "src/app/_components/add/addDialog.component";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  systems: System[];

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getSystems();
  }

  getSystems(): void {
    this.dataService.getSystems().subscribe((actionArray) => {
      this.systems = actionArray.map((item) => {
        return ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        } as any) as System;
      });
    });
  }

  createSystem(system: any): void {
    const currentTime = new Date();
    system.date = currentTime.toString();
    const status = "okay";
    system.status = status;
    this.dataService.createSystem(system);
  }

  deleteSystem(id: string): void {
    this.dataService.deleteSystem(id);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(addDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.createSystem(result.value);
        this._snackBar.open("Anlage hinzugefügt.", "Okay", {
          duration: 4000,
        });
      }
    });
  }
}
