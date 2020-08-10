import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prepayment-calculator',
  templateUrl: './prepayment-calculator.component.html',
  styleUrls: ['./prepayment-calculator.component.css']
})
export class PrepaymentCalculatorComponent implements OnInit {
  public principalAmount: any;
  public interestPer: any;
  public term: any;
  private monthlyEmi: any;
  public displayMonthlyEMI: any;
  public monthlyValues: any = [];
  private tempMonthlyValues:any = [];
  public totalInterestPaid: any = 0;

  constructor() { }

  ngOnInit(): void {
  //  this.calculate();
  }

  calculate() {
    const monthlyTerm = this.interestPer / 100 / 12;
    const powValue = Math.pow(1 + monthlyTerm, this.term);
    this.monthlyEmi = ((this.principalAmount * monthlyTerm) / (1 - (1 / powValue)));
    this.displayMonthlyEMI = Math.round(this.monthlyEmi);
    this.tempMonthlyValues = [];
    this.monthlyValues = [];
    let i = 0;
    let balanceAmount = this.principalAmount;
    while (i < this.term) {
      i++;
      balanceAmount = this.getMonthlyValues(balanceAmount, monthlyTerm);
    }
    this.totalInterestPaid = Math.round(this.totalInterestPaid);
    this.monthlyValues = this.tempMonthlyValues; // Added temporary array to avoid loading html before calculating.
  }

  getMonthlyValues(principalAmount, monthlyTerm) {
    const monthlyInterest = principalAmount * monthlyTerm;
    const principalMonthly = this.monthlyEmi - monthlyInterest;
    this.totalInterestPaid = this.totalInterestPaid + monthlyInterest;
    this.tempMonthlyValues.push({ monthlyInt: Math.round(monthlyInterest), monthlyP: Math.round(principalMonthly), balance: Math.round(principalAmount) });
    return principalAmount - principalMonthly;
  }


}
