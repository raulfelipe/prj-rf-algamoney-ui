import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { PessoaService } from '.././pessoas/pessoa.service';
import { LancamentoService } from '.././lancamentos/lancamento.service';
import { CategoriaService } from '../categorias/categoria.service';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandleService } from './error-handle.service';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule

  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    ErrorHandleService,

    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
