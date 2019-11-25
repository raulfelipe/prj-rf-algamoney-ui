import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandleService } from '../../core/error-handle.service';

import { Pessoa } from '../../core/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandleService,
    private route: ActivatedRoute,
    private title: Title,
    private router: Router,
  ) {}

  ngOnInit() {

    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Cadastro de pessoas');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {

    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.toasty.success('Pessoa adicionada com sucesso!');

      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoas: ${this.pessoa.nome}`);
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this),1);
  this.router.navigate(['/pessoas/novo']);
}

}
