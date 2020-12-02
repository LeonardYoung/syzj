// import { SaleData } from './get-sales.service';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';

export class SaleData {
  title: string;
  content: string;
  current: number;
  previous: number;
}

@Injectable({
  providedIn: 'root'
})
export class GetSalesService {

  private sales: SaleData[] = new Array<SaleData>(3);
  constructor() {
    this.sales[0] = new SaleData();
    this.sales[0].title = '今日';
    this.sales[0].content = '比昨日';
    this.sales[0].current = Math.ceil(Math.random() * 100) / 10;
    this.sales[0].previous = Math.ceil(Math.random() * 100) / 10;

    this.sales[1] = new SaleData();
    this.sales[1].title = '七日';
    this.sales[1].content = '比同期';
    this.sales[1].current = Math.ceil(Math.random() * 700) / 10;
    this.sales[1].previous = Math.ceil(Math.random() * 700) / 10;

    this.sales[2] = new SaleData();
    this.sales[2].title = '本月';
    this.sales[2].content = '比同期';
    this.sales[2].current = Math.ceil(Math.random() * 1000) / 10;
    this.sales[2].previous = Math.ceil(Math.random() * 1000) / 10;
  }
  getSales(): Array<SaleData>{
    return this.sales;
  }
}
