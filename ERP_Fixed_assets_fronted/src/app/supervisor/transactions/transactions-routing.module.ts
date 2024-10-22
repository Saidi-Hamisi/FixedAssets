import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorGuard } from 'src/app/core/guard/supervisor.guard';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {path:"transactions", 
  //canActivate: [SupervisorGuard], 
  component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
