/*
 * @Author: your name
 * @Date: 2020-11-30 16:18:53
 * @LastEditTime: 2020-11-30 16:20:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\shared\components\copyright\copyright.component.ts
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ysj-copyright',
  templateUrl: './copyright.component.html',
})
export class CopyrightComponent {
  @Input() bottom: string;
  text: string;
  constructor() {
    let year = (new Date()).getFullYear();
    this.text = `2010-${year} 生意专家`;
    this.bottom = '10px';
   }

}
