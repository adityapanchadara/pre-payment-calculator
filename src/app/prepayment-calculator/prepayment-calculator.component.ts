import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prepayment-calculator',
  templateUrl: './prepayment-calculator.component.html',
  styleUrls: ['./prepayment-calculator.component.css']
})
export class PrepaymentCalculatorComponent implements OnInit {
  public principalAmount: any = 6000000;
  public interestPer: any = 8.65;
  public term: any = 240;
  public monthlyEmi: any;
  public monthlyValues: any = [];
  // Formula: MonthlyEmi = (principalAmount*interestAmt)/(1-(1/Math.pow(1+interestAmt), term));

  constructor() { }

  ngOnInit(): void {
    this.calculate();
  }

  calculate() {
    const monthlyTerm = this.interestPer / 100 / 12;
    const powValue = Math.pow(1 + monthlyTerm, this.term);
    this.monthlyEmi = ((this.principalAmount * monthlyTerm) / (1 - (1 / powValue)));
    let i = 0;
    let balanceAmount = this.principalAmount;
    while (i < this.term) {
      i++;
      balanceAmount = this.getMonthlyValues(balanceAmount, monthlyTerm);
    }
  }

  getMonthlyValues(principalAmount, monthlyTerm) {
    const monthlyInterest = principalAmount * monthlyTerm;
    const principalMonthly = this.monthlyEmi - monthlyInterest;
    this.monthlyValues.push({ monthlyInt: Math.round(monthlyInterest), monthlyP: Math.round(principalMonthly), balance: principalAmount });
    console.log(this.monthlyValues);
    return principalAmount - principalMonthly;
  }


}
