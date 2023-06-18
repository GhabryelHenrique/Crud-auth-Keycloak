import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Content, IBank } from './models/bank.model';
import { IParams } from './models/iParams.model';
import { BanksService } from './services/banks.service';
import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent {
  banks?: Content<IBank>;
  allSelected: boolean = false;
  totalPagesArray: number[] = [];
  selectedPage: any = 1;
  userRoles: any;

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
    private oauthService: OAuthService
  ) {
    this.userRoles =
      (jwtDecode(this.oauthService.getAccessToken()) as any
    ).groups;
  }

  ngOnInit() {
    this.getBanks();
  }

  selectAll() {
    this.banks?.content.forEach((element) => {
      !this.allSelected
        ? (element.isSelected = true)
        : (element.isSelected = false);
    });
    this.allSelected = !this.allSelected;
  }

  getBanks(filter?: any) {
    this.banksService.getBanks(filter).subscribe((banks) => {
      this.banks = banks;
      this.totalPagesArray = Array.from(
        { length: this.banks.totalPages },
        (_, i) => i + 1
      );
    });
  }

  filterBanks(event: any) {
    this.selectedPage = 1;
    this.getBanks({ pesquisa: event.target?.value as string, pageNumber: 0 });
  }

  selectPage(page: number) {
    this.selectedPage = page;
    this.getBanks({ pageNumber: page - 1 });
  }

  deleteBanks() {
    const banksToDelete = this.banks!.content.filter((bank) => {
      return bank.isSelected == true;
    }).map((bank) => bank.id);

    if (!banksToDelete.length) return;

    Swal.fire({
      title: 'Confirmação de Exclusão',
      text: `Confirma a exclusão de ${banksToDelete.length} registro(s) selecionados`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.banksService
          .deleteListBanks({ cfopMap: banksToDelete })
          .subscribe((res) => {
            this.toast.fire({
              icon: 'success',
              title: 'Banco(s) Excluido(s) com sucesso',
            });
          });
      }
    });
  }

  viewOrEditBank(id: number) {
    this.router.navigate([`/banks/${id}`]);
  }
}
