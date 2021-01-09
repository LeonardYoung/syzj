import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PovercpntComponent } from './povercpnt.component';

describe('PovercpntComponent', () => {
  let component: PovercpntComponent;
  let fixture: ComponentFixture<PovercpntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PovercpntComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PovercpntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
