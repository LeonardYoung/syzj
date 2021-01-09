import { Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-povercpnt',
  templateUrl: './povercpnt.component.html',
  styleUrls: ['./povercpnt.component.scss'],
})
export class PovercpntComponent implements OnInit {

  constructor(private productService: ProductService,private router :Router) { }

  ngOnInit() {}

  onDelete(){
    this.productService.deleteCurrentProduct();
    this.router.navigateByUrl('product/list')
  }

}
