import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'crm-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  clients: Array<Client> = [];

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
      error: (error) => console.log('ERROR: ', error),
    });
  }
}
