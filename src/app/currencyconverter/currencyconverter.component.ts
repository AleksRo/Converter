import { Component} from '@angular/core';
import {
  CurrencyApiService
} from "../services/currency-api.service"


@Component({
  selector: 'app-currencyconverter',
  templateUrl: './currencyconverter.component.html',
  styleUrls: ['./currencyconverter.component.scss']
})
export class CurrencyconverterComponent {

  constructor(private curApi: CurrencyApiService) {}
  
  currencyNames = [
    "USD",
    "EUR",
    "UAH"
  ]

  input1: number = 0
  input2: number = 0
  currency1:string = "USD"
  currency2:string = "UAH"

  onChangeCurr1($event) {
    this.currency1 = $event.target.value
    this.convertRight()
  }

  onChangeCurr2($event) {
    this.currency2 = $event.target.value
    this.convertRight()
  }

  convertLeft() {
    if (this.currency1 === this.currency2) {
      this.input1 = this.input2
      return
    }

    this.curApi.convert(this.currency2, this.currency1, this.input2).subscribe((data => {
      this.input1 = data.result
    }))
  }

  convertRight() {
    if (this.currency1 === this.currency2) {
      this.input2 = this.input1
      return
    }

    this.curApi.convert(this.currency1, this.currency2, this.input1).subscribe((data => {
      this.input2 = data.result
    }))
  }

  onKeyUpEvent1($event) {
    if (this.input1) {
      this.convertRight()
    }
  }

  onKeyUpEvent2($event) {
    if (this.input2) {
      this.convertLeft()
    }
  }
}
