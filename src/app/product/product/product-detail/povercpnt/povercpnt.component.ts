import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-povercpnt',
  templateUrl: './povercpnt.component.html',
  styleUrls: ['./povercpnt.component.scss'],
})
export class PovercpntComponent implements OnInit {

  id:string;
  constructor(private popoverCtl: PopoverController,
    private navParams: NavParams) {
      this.id = this.navParams.data['id'];
     }

  ngOnInit() {}

  onEdit(){
    this.popoverCtl.dismiss('edit')
  }
  onDelete(){
    this.popoverCtl.dismiss('delete')
  }

}
