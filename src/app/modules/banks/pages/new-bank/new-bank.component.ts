import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IBank } from '../../models/bank.model';
import { BanksService } from '../../services/banks.service';

@Component({
  selector: 'app-new-bank',
  templateUrl: './new-bank.component.html',
  styleUrls: ['./new-bank.component.scss'],
})
export class NewBankComponent implements OnInit {
  bank?: IBank;
  formulario?: FormGroup;

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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      codigo: [''],
      descricao: [''],
      status: [''],
    });
  }

  salvar() {
    var formToEdit: IBank = this.formulario!.value;

    formToEdit.status = {
      id: this.formulario!.value.status,
      descricao: this.formulario!.value.status === 'A' ? 'ATIVO' : 'INATIVO',
    };

    this.banksService.createBank(formToEdit).subscribe(
      (res) => {
        this.toast.fire({
          icon: 'success',
          title: 'Banco criado com sucesso',
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
}
