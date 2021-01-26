import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'addDialog',
    templateUrl: 'addDialog.html',
    styleUrls: ['./add.component.scss']
})

export class addDialog {
    addForm = new FormGroup({
        name: new FormControl('', Validators.required),
        inumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        location: new FormControl('', [Validators.required]),
    });

    constructor(public dialogRef: MatDialogRef<addDialog>) {
    }

    onSubmit() {
        if (this.addForm.valid) {
            this.dialogRef.close(this.addForm);
        }
    }
}
