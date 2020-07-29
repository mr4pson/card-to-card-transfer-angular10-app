import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MaskConfig } from '../../models/mask-config.model';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'uralsib-create-transaction-page',
  templateUrl: './create-transaction-page.component.html',
  styleUrls: ['./create-transaction-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTransactionPageComponent implements OnInit {
  public maskConfig: MaskConfig = {
    cardNumberMask: { mask: '0000' },
    sumMask: { mask: new Number }
  }
  public months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years: number[] = [2020, 2021, 2022];
  public form = new FormGroup({
    payer: new FormGroup({
      cardNumber1: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      cardNumber2: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      cardNumber3: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      cardNumber4: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      name: new FormControl(null, [Validators.required]),
      activeUntilMonth: new FormControl(null, [Validators.required]),
      activeUntilYear: new FormControl(null, [Validators.required])
    }),
    recipient: new FormGroup({
      cardNumber1: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      cardNumber2: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      cardNumber3: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      cardNumber4: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    }),
    sum: new FormControl(null, [Validators.required])
  });
  constructor(
    private transactonService: TransactionService
  ) { }
  public keytab(event): void {
    let element = event.srcElement.parentNode.parentNode.parentNode.parentNode.nextElementSibling;
    if(element && event.srcElement.value.length === 4) {
      element.querySelector("input").focus();
    }
  }
  public onSubmit(): void {
    const { payer, recipient, sum } = this.form.value;
    const payload = {
      id: uuidv4(),
      payer: {
        cardNumber: payer.cardNumber1.toString() + payer.cardNumber2.toString() + payer.cardNumber3.toString() + payer.cardNumber4.toString(),
        name: payer.name,
        activeUntilMonth: payer.activeUntilMonth,
        activeUntilYear: payer.activeUntilYear
      },
      recipient: {
        cardNumber: recipient.cardNumber1.toString() + recipient.cardNumber2.toString() + recipient.cardNumber3.toString() + recipient.cardNumber4.toString()
      },
      sum: sum,
      dc: new Date()
    } as Transaction;
    this.transactonService.createTransaction(payload);
    this.form.patchValue({
      payer: {
        cardNumber1: null,
        cardNumber2: null,
        cardNumber3: null,
        cardNumber4: null,
        name: null,
        activeUntilMonth: null,
        activeUntilYear: null
      },
      recipient: {
        cardNumber1: null,
        cardNumber2: null,
        cardNumber3: null,
        cardNumber4: null,
      },
      sum: null
    });
    this.form.reset();
  }
  ngOnInit(): void {
  }

}
