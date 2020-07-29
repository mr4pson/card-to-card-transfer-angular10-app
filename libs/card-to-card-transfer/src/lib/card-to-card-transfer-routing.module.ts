import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTransactionPageComponent } from './components/create-transaction-page/create-transaction-page.component';
import { TransactionHistoryPageComponent } from './components/transaction-history-page/transaction-history-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'create'
    },
    {
        path: 'create',
        component: CreateTransactionPageComponent
    },
    {
        path: 'history',
        component: TransactionHistoryPageComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CardToCardTransferRoutingModule { }
