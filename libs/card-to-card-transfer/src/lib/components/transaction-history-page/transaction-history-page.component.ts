import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'uralsib-transaction-history-page',
  templateUrl: './transaction-history-page.component.html',
  styleUrls: ['./transaction-history-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionHistoryPageComponent implements OnInit {
  public transactions: Transaction[];
  private subscription: Subscription;
  constructor(
    private transactionService: TransactionService,
    private decimalPipe: DecimalPipe
  ) { }
  showLimitedCardNumber(cardNumber: string): string {
    return cardNumber.substr(0, 4).toString() + ' **** **** ' + cardNumber.substr(12, 16).toString()
  }
  formatNumber(number: number): string {
    return this.decimalPipe.transform(number, '1.2-2').replace(',', ' ')
  }
  repeatTransaction(id: string): void {
    this.transactionService.repeatTransaction(id);
  }
  removeTransaction(id: string): void {
    this.transactionService.removeTransaction(id);
  }
  ngOnInit(): void {
    this.subscription = this.transactionService.getTransactions().subscribe((transactions: Transaction[]) => {
      this.transactions = [...transactions];
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
