import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isLinear = false;
  addressFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  addFormGroup: FormGroup;
  contract: string;
  paymentInfoData: any;
  addressInfoData: any;
  cowner: string;
  contractInfo: any;

  constructor(private _formBuilder: FormBuilder, private dataService: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPaymentInfo();
    this.getContractInfo();
    this.getAddressInfo();
    this.addressFormGroup = this._formBuilder.group({
      company: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.paymentFormGroup = new FormGroup({
      cowner: new FormControl('', [Validators.required]),
      cnumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      ccv: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(3), Validators.minLength(3)]),
      emonth: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(12), Validators.min(1)]),
      eyear: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(2099), Validators.min(2019)])
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.addFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      inumber: ['', Validators.required],
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
      this.setPaymentFormGroup();
    });
  }

  updatePayment() {
    const newPayment = {
      cowner: this.paymentFormGroup.get('cowner').value,
      cnumber: this.paymentFormGroup.get('cnumber').value,
      ccv: this.paymentFormGroup.get('ccv').value,
      emonth: this.paymentFormGroup.get('emonth').value,
      eyear: this.paymentFormGroup.get('eyear').value,

    }
    if (this.paymentFormGroup.valid) {
      this.dataService.updatePaymentInfo(newPayment, this.paymentInfoData[0].id);
    }
    else {
      this._snackBar.open("Bitte alles ausfüllen.", "Okay", {
        duration: 4000,
      })
    }
  }

  setPaymentFormGroup() {
    this.paymentFormGroup.get('cowner').setValue(this.paymentInfoData[0].cowner);
    this.paymentFormGroup.get('cnumber').setValue(this.paymentInfoData[0].cnumber);
  }

  getAddressInfo() {
    this.dataService.getAddressInfo().subscribe(actionArray => {
      this.addressInfoData = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as any;
      })
      this.setAddressFormGroup();
    });
  }

  setAddressFormGroup() {
    this.addressFormGroup.get('company').setValue(this.addressInfoData[0].company);
    this.addressFormGroup.get('firstName').setValue(this.addressInfoData[0].firstName);
    this.addressFormGroup.get('lastName').setValue(this.addressInfoData[0].lastName);
    this.addressFormGroup.get('address').setValue(this.addressInfoData[0].address);
    this.addressFormGroup.get('zipCode').setValue(this.addressInfoData[0].zipCode);
    this.addressFormGroup.get('city').setValue(this.addressInfoData[0].city);
  }

  updateAddress() {
    const newAddress = {
      company: this.addressFormGroup.get('company').value,
      firstName: this.addressFormGroup.get('firstName').value,
      lastName: this.addressFormGroup.get('lastName').value,
      address: this.addressFormGroup.get('address').value,
      zipCode: this.addressFormGroup.get('zipCode').value,
      city: this.addressFormGroup.get('city').value
    }
    if (this.addressFormGroup.valid) {
      this.dataService.updateAddressInformation(newAddress, this.addressInfoData[0].id);

    }
    else {
      this._snackBar.open("Bitte alles ausfüllen.", "Okay", {
        duration: 4000,
      })
    }
  }

  getContractInfo() {
    this.dataService.getContractInfo().subscribe(actionArray => {
      this.contractInfo = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as any;
      })
      this.contract = this.contractInfo[0].contract;
    });
  }

  updateContract() {
    const contractNewInfo = { contract: this.contract }
    this.dataService.updateContractInfo(contractNewInfo, this.contractInfo[0].id)
  }
}
