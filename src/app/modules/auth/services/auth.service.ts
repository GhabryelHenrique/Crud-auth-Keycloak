import { TokenService } from './../../../core/services/token.service';
import { Injectable } from '@angular/core';
import { ILoginData } from '../models/auth-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) { }

  login(loginData: ILoginData){
    this.http.post('tasfasdofsndofsoduj', loginData)
  }

  logout(){
    this.tokenService.deleteToken()
  }
}
