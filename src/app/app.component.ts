import { Component } from '@angular/core';
import { OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { authConfig } from './core/keycloak/auth.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'teste-crud-auth';
  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private urlHelperService: UrlHelperService
  ) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.dummyClientSecret = authConfig.dummyClientSecret;
    this.oauthService.tokenEndpoint = authConfig.token_endpoint;
    this.oauthService.userinfoEndpoint = authConfig.userinfo_endpoint;

    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.redirectUri = window.location.origin + '/';
    this.urlHelperService.getHashFragmentParams();
    this.oauthService.oidc = false
    this.oauthService.tryLogin();

    this.oauthService
      .loadDiscoveryDocument(environment.keycloak.descobrirEndpoint)
      .then((res) => {
        console.log(res);
      });
  }

  isLoginPage(): boolean {
    return this.router.url !== '/login';
  }

}
