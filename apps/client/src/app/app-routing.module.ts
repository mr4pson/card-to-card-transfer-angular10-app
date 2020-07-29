import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'card-to-card-transfer'
    },
    {
        path: 'card-to-card-transfer',
        loadChildren: () => import('libs/card-to-card-transfer/src').then(m => m.CardToCardTransferModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
