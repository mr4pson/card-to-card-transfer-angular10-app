import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject } from 'rxjs';
import { transition } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
  constructor(
    private notification: NzNotificationService
  ) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) as Transaction[];
    transactions ? this.transactions$.next(transactions) : this.transactions$.next([]);
  }
  getTransactions(): BehaviorSubject<Transaction[]> {
    return this.transactions$;
  }
  createTransaction(transaction: Transaction) {
    const transactions = this.transactions$.getValue() as Transaction[];
    transactions.push(transaction);
    this.transactions$.next(transactions);
    this.notification.success('Транзакция успешно создана.', '');
    localStorage.setItem('transactions', JSON.stringify(this.transactions$.getValue()));
  }
  repeatTransaction(id: string): void {
    const transaction: Transaction = this.transactions$.getValue().find((transaction: Transaction) => transaction.id === id);
    const transactions = this.transactions$.getValue() as Transaction[];
    transactions.push({
      ...transaction,
      id: uuidv4(),
      dc: new Date()
    });
    this.transactions$.next(transactions);
    this.notification.success('Транзакция успешно повторена.', '');
    localStorage.setItem('transactions', JSON.stringify(this.transactions$.getValue()));
  }
  removeTransaction(id: string): void {
    const index: number = this.transactions$.getValue().findIndex((transaction: Transaction) => transaction.id === id);
    const transactions = this.transactions$.getValue() as Transaction[];
    transactions.splice(index, 1);
    this.transactions$.next(transactions);
    this.notification.success('Транзакция успешно удалена.', '');
    localStorage.setItem('transactions', JSON.stringify(this.transactions$.getValue()));
  }
}
