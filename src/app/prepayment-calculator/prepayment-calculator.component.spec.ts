import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaymentCalculatorComponent } from './prepayment-calculator.component';

describe('PrepaymentCalculatorComponent', () => {
  let component: PrepaymentCalculatorComponent;
  let fixture: ComponentFixture<PrepaymentCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaymentCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaymentCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
