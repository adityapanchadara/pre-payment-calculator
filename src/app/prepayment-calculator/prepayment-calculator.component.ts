import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prepayment-calculator',
  templateUrl: './prepayment-calculator.component.html',
  styleUrls: ['./prepayment-calculator.component.css']
})
export class PrepaymentCalculatorComponent implements OnInit {
  public principalAmount: number = 0;
  public interestPer: any;
  public term: any;
  private monthlyEmi: any;
  public displayMonthlyEMI: any;
  public monthlyValues: any = [];
  private tempMonthlyValues:any = [];
  public totalInterestPaid: number = 0;
  public totalAmount: number = 0;
  public prepaymentMonth: any = [{amount: 0, month: 0}];
  public overAllInterest: any;
  public amountSaved: any;
  public monthlyPay: any = [{month: 0, amount: 0}];

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
      if(balanceAmount<0) {
        break;
      }
      balanceAmount = this.getMonthlyValues(balanceAmount, monthlyTerm, i);
    }
    this.totalInterestPaid = Math.round(this.totalInterestPaid);
    this.overAllInterest = (this.monthlyEmi*this.term) - Number(this.principalAmount);
    this.totalAmount = this.totalInterestPaid + Number(this.principalAmount);
    const getOverAllAmount = this.overAllInterest + Number(this.principalAmount);
    this.amountSaved = Math.round(getOverAllAmount) - this.totalAmount;
    this.monthlyValues = this.tempMonthlyValues; // Added temporary array to avoid loading html before calculating.
  }

  getMonthlyValues(principalAmount, monthlyTerm, i) {
    const monthlyInterest = principalAmount * monthlyTerm;
    const principalMonthly = this.monthlyEmi - monthlyInterest;
    this.totalInterestPaid = this.totalInterestPaid + monthlyInterest;
    this.tempMonthlyValues.push({ monthlyInt: Math.round(monthlyInterest), monthlyP: Math.round(principalMonthly), balance: Math.round(principalAmount) });
    this.prepaymentMonth.forEach(element => {
      if(element.month == i && element.month !== -1) {
        principalAmount = Number(principalAmount) - Number(element.amount);
      }
    });
    if(this.monthlyPay[0].month > 0) {
      principalAmount = Number(principalAmount) - Number(this.monthlyPay[0].amount);
    }
    return principalAmount - principalMonthly;
  }

  addPrepays() {
    this.prepaymentMonth.push({amount: 0, month: 0});
  }

}
