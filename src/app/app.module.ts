import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientsListComponent } from './pages/clients/clients-list/clients-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CnpjPipe } from './components/shared/pipe/cnpj.pipe';
import { TelPipe } from './components/shared/pipe/tel.pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { ClientModalModule } from './pages/clients/client-modal/client-modal.module';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { NetworkInterceptor } from './components/shared/network.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsListComponent,
    ClientFormComponent,
    HomeComponent,
    CnpjPipe,
    TelPipe,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    ClientModalModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
