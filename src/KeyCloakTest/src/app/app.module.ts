import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app.component';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('[constructor]');
    keycloakService
      .init({
        config: {
          url: 'https://ia-coc-devops.westeurope.cloudapp.azure.com/auth/realms/devops/protocol/openid-connect/auth',
          realm: 'your-realm',
          clientId: 'client-id'
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets', '/clients/public']
      })
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');
 
        //app.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
  
  ngDoBootstrap(app) {
    console.log('[ngDoBootstrap]');
  }
}
