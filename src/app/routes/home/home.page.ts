import { GetSalesService } from './services/get-sales.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private sales: any;
  constructor(private getSaleService: GetSalesService) { }

  ngOnInit() {
    this.sales = this.getSaleService.getSales();
  }
  /**
   *
   * @param  current 当前销售数据
   * @param   previous 前期销售数据
   * @returns   1 增长 0 持平 -1 减少
   */
  minus(current: number, previous: number): number {
    const result = current - previous;
    if (result > 0) {
      return 1;
    } else if (result === 0) {
      return 0;
    } else {
      return -1;
    }
}

}
