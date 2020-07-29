import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CardToCardTransferRoutingModule } from './card-to-card-transfer-routing.module';
import { CreateTransactionPageComponent } from './components/create-transaction-page/create-transaction-page.component';
import { TransactionHistoryPageComponent } from './components/transaction-history-page/transaction-history-page.component';

@NgModule({
  imports: [
    CommonModule, 
    CardToCardTransferRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    IMaskModule
  ],
  declarations: [
    CreateTransactionPageComponent, 
    TransactionHistoryPageComponent
  ],
  providers: [
    DecimalPipe
  ]
})
export class CardToCardTransferModule {}
