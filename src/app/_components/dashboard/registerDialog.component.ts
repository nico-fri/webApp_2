import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'registerDialog',
    templateUrl: 'registerDialog.html',
    styleUrls: ['./dashboard.component.scss']
})

export class registerDialog {
    addressFormGroup: FormGroup;
    addFormGroup: FormGroup;
    paymentFormGroup: FormGroup;
    isLinear = false;
    userData: any;
    contract: string = "silber";
    contractInfo: any;


    constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<registerDialog>) { }

    ngOnInit() {
        this.addressFormGroup = this._formBuilder.group({
            company: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            zipCode: ['', Validators.required, Validators.pattern("^[0-9]*$")],
            city: ['', Validators.required],
        });
        this.addFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            location: ['', Validators.required],
            inumber: ['', Validators.required],
        });
        this.paymentFormGroup = new FormGroup({
            cowner: new FormControl('', [Validators.required]),
            cnumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
            ccv: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(3), Validators.minLength(3)]),
            emonth: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(12), Validators.min(1)]),
            eyear: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(2099), Validators.min(2019)])
          });

    }

    onSubmit() {
        if(this.addressFormGroup.valid && this.addFormGroup.valid && this.paymentFormGroup.valid){
            this.contractInfo = {contract: this.contract}
            this.userData = [this.addressFormGroup, this.addFormGroup, this.paymentFormGroup, this.contractInfo]
            this.dialogRef.close(this.userData);
        }
    }
}
