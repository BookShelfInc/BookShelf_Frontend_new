import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BazaarListComponent } from './bazaar-list.component';

describe('BazaarListComponent', () => {
  let component: BazaarListComponent;
  let fixture: ComponentFixture<BazaarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BazaarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BazaarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
