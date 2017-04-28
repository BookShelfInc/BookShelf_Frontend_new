import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BazaarDetailComponent } from './bazaar-detail.component';

describe('BazaarDetailComponent', () => {
  let component: BazaarDetailComponent;
  let fixture: ComponentFixture<BazaarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BazaarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BazaarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
