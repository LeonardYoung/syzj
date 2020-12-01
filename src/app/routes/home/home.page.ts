import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public sales = [
    {
      title: 'title1',
      current: 100,
      previous: 111,
      number: 99,
      content: '比昨日',
    },
    {
      title: 'title2',
      current: 100,
      previous: 2,
      number: 99,
      content: '比昨日',
    },
    {
      title: 'title1',
      current: 100,
      previous: 111,
      number: 99,
      content: '比昨日',
    },
    {
      title: 'title2',
      current: 100,
      previous: 100,
      number: 99,
      content: '比昨日',
    },
  ]
  constructor() { }

  ngOnInit() {
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
