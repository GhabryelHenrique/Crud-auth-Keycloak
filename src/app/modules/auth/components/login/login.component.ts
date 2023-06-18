import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(
    private readonly fb: FormBuilder,
    private oauthService: OAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    this.oauthService
      .fetchTokenUsingPasswordFlowAndLoadUserProfile(
        this.form.value.username,
        this.form.value.password
      )
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.toast.fire({
          icon: 'error',
          text: 'Usuário ou senha incorretos'
        })
        console.error(error);
      });
  }

  public logoff() {
    this.oauthService.logOut();
  }
}
