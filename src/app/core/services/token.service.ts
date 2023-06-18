import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'token'

  constructor() { }

  getToken(){
    return localStorage.getItem(this.tokenKey)!
  }

  setToken(token: string){
    return localStorage.setItem(this.tokenKey, token)
  }

  deleteToken(){
    return localStorage.removeItem(this.tokenKey)
  }
}
