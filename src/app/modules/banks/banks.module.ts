import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksComponent } from './banks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ViewBankComponent } from './pages/view-bank/view-bank.component';
import { NewBankComponent } from './pages/new-bank/new-bank.component';

const routes: Routes = [
  {
    path: '',
    component: BanksComponent
  },
  {
    path: ':id',
    component: ViewBankComponent
  },
  {
    path: 'newBank/createBank',
    component: NewBankComponent
  }
]

@NgModule({
  declarations: [
    BanksComponent,
    NewBankComponent,
    ViewBankComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SweetAlert2Module.forChild(),
    FormsModule
  ]
})
export class BanksModule { }
