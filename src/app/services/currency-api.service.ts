import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyApiService {

  constructor(private http: HttpClient) {}

  readonly url = "https://api.apilayer.com/fixer/"

  get(method: string, params: any = {}) {
    let headers = this.createAuthorizationHeader()

    let url = this.url + method + "?"
    for (var key in params) {
      url += "&" + key + "=" + params[key]
    }
    return this.http.get<any>(url,
      { headers: headers })
  }

  createAuthorizationHeader() {
    let headers = new HttpHeaders()
      .set("apikey", "dRZ8qKqyQvKSHxaCRZJIOaz1JszDniVa")
    return headers
  }

  convert(from: string, to: string, amount: number): Observable<any> {
    return this.get("convert",
      { from: from, to: to, amount: amount })
  }

  latest(symbols: string, base: string): Observable<any> {
    return this.get("latest",
      { symbols: symbols, base: base })
  }
}