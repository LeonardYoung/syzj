import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductDepotPage } from './product-depot.page';

describe('ProductDepotPage', () => {
  let component: ProductDepotPage;
  let fixture: ComponentFixture<ProductDepotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDepotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDepotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
