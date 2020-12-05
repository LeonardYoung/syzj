import { GetSalesService } from './services/get-sales.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public homeItems = [
    { title: '新增商品', url: '/home', icon: '/assets/img/add_sales.svg' },
    { title: '新增会员', url: '/home', icon: '/assets/img/add_user.svg' },
    { title: '收银记账', url: '/home', icon: '/assets/img/sales_account.svg' },
    { title: '支出管理', url: '/home', icon: '/assets/img/a_note.svg' },
    { title: '商品管理', url: '/home', icon: '/assets/img/sales_management.svg' },
    { title: '会员管理', url: '/home', icon: '/assets/img/user_management.svg' },
    { title: '查询销售', url: '/home', icon: '/assets/img/shop_management.svg' },
    { title: '智能分析', url: '/home', icon: '/assets/img/analysis.svg' },
    { title: '供应商管理', url: '/home', icon: '/assets/img/gongying_more.svg' },
    { title: '挂单', url: '/home', icon: '/assets/img/guandan_more.svg' },
    { title: '高级功能', url: '/home', icon: '/assets/img/image_addsales.svg' },
  ];
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
