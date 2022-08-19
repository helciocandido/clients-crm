import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { ClientsListComponent } from './pages/clients/clients-list/clients-list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'clients',
    component: ClientsListComponent,
  },
  {
    path: 'clients/new',
    component: ClientFormComponent,
  },
  {
    path: 'clients/info/:id',
    component: ClientFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
