import { OAuthService } from 'angular-oauth2-oidc';
import { Component, Input, OnInit } from '@angular/core';
import { BanksService } from '../../services/banks.service';
import { IBank } from '../../models/bank.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.scss'],
})
export class ViewBankComponent implements OnInit {
  bank?: IBank;
  formulario?: FormGroup;

  userRoles: any

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(
    private banksService: BanksService,
    private router: Router,
    private route: ActivatedRoute,
    private oauthService: OAuthService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getBankById(id);
    });
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.userRoles = (jwtDecode(this.oauthService.getAccessToken()) as any).groups
  }

  getBankById(id: string) {
    this.banksService.getBankById(id).subscribe(
      (arg) => {
        this.bank = arg;
        this.formulario?.setValue({
          codigo: this.bank.codigo,
          descricao: this.bank.descricao,
          status: this.bank.status.id,
        });
      },
      (err) => {
        this.toast.fire({
          icon: 'error',
          title: err.error[0].mensagemUsuario,
        });
      }
    );
  }

  deleteBank() {
    Swal.fire({
      title: 'Confirmação de Exclusão',
      text: `Confirma a exclusão do registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.banksService.deleteBank(this.bank!.id).subscribe(
          (res) => {
            this.toast.fire({
              icon: 'success',
              title: 'Banco Excluido com sucesso',
            });
            this.router.navigate(['/banks']);
          },
          (err) => {
            this.toast.fire({
              icon: 'error',
              title: err.error[0].mensagemUsuario,
            });
          }
        );
      }
    });
  }

  edit() {
    var formToEdit: IBank = this.formulario!.value;

    formToEdit.id = this.bank!.id;
    formToEdit.status = {
      id: this.formulario!.value.status,
      descricao: this.formulario!.value.status === 'A' ? 'ATIVO' : 'INATIVO',
    };

    this.banksService.editBank(this.bank!.id, formToEdit).subscribe(
      (res) => {
        this.toast.fire({
          icon: 'success',
          title: 'Banco editado com sucesso',
        });
      },
      (err) => {
        this.toast.fire({
          icon: 'error',
          title: err.error[0].mensagemUsuario,
        });
      }
    );
  }

  isUserRoleBancoEdt(){
    return this.userRoles.includes('ROLE_BANCO_EDT');
  }
}
