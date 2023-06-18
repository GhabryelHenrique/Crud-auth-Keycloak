import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

export const authConfig: any = {

    // Url of the Identity Provider
    issuer: environment.keycloak.issuer,

    tokenEndpoint: environment.keycloak.tokenEndpoint,
    userinfoEndpoint: environment.keycloak.userinfoEndpoint,
    redirectUri: environment.keycloak.redirectUri,
    grantType: environment.keycloak.grantType,

    clientId: environment.keycloak.clientId,

    responseType: environment.keycloak.responseType,
    dummyClientSecret: environment.keycloak.clientSecret,

    scope: environment.keycloak.scope,

    requireHttps: environment.keycloak.requireHttps,

    showDebugInformation: environment.keycloak.showDebugInformation,
    disableAtHashCheck: environment.keycloak.disableAtHashCheck
};


export class OAuthModuleConfig {
    resourceServer: OAuthResourceServerConfig = {sendAccessToken: true};
}

export class OAuthResourceServerConfig {
    /**
     * Urls for which calls should be intercepted.
     * If there is an ResourceServerErrorHandler registered, it is used for them.
     * If sendAccessToken is set to true, the access_token is send to them too.
     */
    allowedUrls?: Array<string>;
    sendAccessToken = true;
    customUrlValidation?: (url: string) => boolean;
}
