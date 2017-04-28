import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BazaarCreateComponent } from './bazaar-create.component';

describe('BazaarCreateComponent', () => {
  let component: BazaarCreateComponent;
  let fixture: ComponentFixture<BazaarCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BazaarCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BazaarCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
