import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutiveGuard } from 'src/app/core/guard/executive.guard';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: "", 
  //canActivate: [ExecutiveGuard], 
  component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
