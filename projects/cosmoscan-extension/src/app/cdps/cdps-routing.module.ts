import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CdpComponent } from './cdp/cdp.component';
import { ClearComponent } from './cdp/clear/clear.component';
import { DepositComponent } from './cdp/deposit/deposit.component';
import { IssueComponent } from './cdp/issue/issue.component';
import { WithdrawComponent } from './cdp/withdraw/withdraw.component';
import { CdpsComponent } from './cdps.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: CdpsComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },

  {
    path: ':cdp_id',
    component: CdpComponent,
  },
  {
    path: ':cdp_id/deposit',
    component: DepositComponent,
  },
  {
    path: ':cdp_id/withdraw',
    component: WithdrawComponent,
  },
  {
    path: ':cdp_id/issue',
    component: IssueComponent,
  },
  {
    path: ':owner/:denom/clear',
    component: ClearComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CdpsRoutingModule {}
