import { Component, OnInit } from '@angular/core';
import { CurrencyApiService} from "../services/currency-api.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly currencyNames = [
    "USD",
    "EUR"
  ]
  data: any
  readonly mainCurrencyName = "UAH"
  
  constructor(private curApi: CurrencyApiService) {}

  ngOnInit(): void {
    this.getCurrencyRates()
  }

  getCurrencyRates() {
    let symbols = this.currencyNames.join(",")
    
    this.curApi.latest(symbols, this.mainCurrencyName).subscribe((data => {
      let rates = data.rates

      Object.keys(rates).forEach(function (key, index) {
        rates[key] = (1 / rates[key]).toFixed(4)
      });

      this.data = rates
    }))
  }
}
