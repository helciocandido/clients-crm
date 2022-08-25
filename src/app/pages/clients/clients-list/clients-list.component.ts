import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/components/shared/spinner/spinner.service';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crm-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  faPlus = faPlus;
  clients: Array<Client> = [];
  client: Client = {
    id: 0,
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    rsocial: '',
    outras: '',
  };

  constructor(private clienteService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clienteService.getClients().subscribe({
      next: (response) => {
        this.clients = response;
      },
      error: (error) => console.log('GET ERROR: ', error),
    });
  }

  deleteClient(id: number, client: Client): void {
    this.clienteService.deleteClient(id, client).subscribe({
      next: () => this.getClients(),
      complete: () => {
        this.clienteService.updateId(id).subscribe({
          next: () => this.getClients(),
        });
      },
      error: (error) => console.log('ERROR: ', error),
    });
  }

  showClient(id: number): void {
    this.client = this.clients[id - 1];
  }
}
