// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  envName: 'local',
  baseApiURL: 'http://sinple-api-dev.us-east-1.elasticbeanstalk.com:8080',
  keycloak: {
    issuer:
      'http://auth-keycloak-dev.us-east-1.elasticbeanstalk.com/realms/princeton-lemitar',
    tokenEndpoint:
      'http://auth-keycloak-dev.us-east-1.elasticbeanstalk.com/realms/princeton-lemitar/protocol/openid-connect/token',
    userinfoEndpoint:
      'http://auth-keycloak-dev.us-east-1.elasticbeanstalk.com/realms/princeton-lemitar/protocol/openid-connect/userinfo',
    descobrirEndpoint:
      'http://auth-keycloak-dev.us-east-1.elasticbeanstalk.com/realms/princeton-lemitar/.well-known/openid-configuration',
    redirectUri: 'http://localhost:4200',
    clientId: 'sinple-web',
    responseType: 'code',
    scope: 'user-sinple-web-roles',
    clientSecret: 'ZzVCevKWN9kQ1SNjahS6HhQ6yB4bqdc6',
    grantType: 'password',
    grantTypeRefresh: 'refresh_token',
    requireHttps: false,
    showDebugInformation: true,
    disableAtHashCheck: true,
  },
};
