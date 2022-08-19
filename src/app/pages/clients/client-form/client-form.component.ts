import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'crm-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  clients: Array<Client> = [];
  clientId: any;

  public cnpjMask = [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  telMask = function (rawValue: string) {
    let result = rawValue.replace(/\D/g, '').split('');
    if (result.length > 10) {
      return [
        '(',
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    }
    return [
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
  };

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      id: 0,
      nome: '',
      cnpj: '',
      endereco: '',
      telefone: '',
      rsocial: '',
      outras: '',
    });
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe({
      next: (params) => {
        this.clientId = params.get('id');
        if (this.clientId) {
          this.clientService.getClient(this.clientId).subscribe({
            next: (result) => {
              this.clientForm.patchValue({
                id: result[0],
                nome: result[1],
                cnpj: result[2],
                endereco: result[3],
                telefone: result[4],
                rsocial: result[5],
                outras: result[6],
              });
            },
            error: (error) => console.log(error),
          });
        }
      },
      error: (error) => console.log(error),
      complete: () => console.log('Client form'),
    });
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe((response) => {
      this.clients = response;
    });
  }

  createClient() {
    this.clientForm.get('id')?.patchValue(this.clients.length + 1);
    this.clientService.postClient(this.clientForm.value).subscribe({
      next: (result) => this.router.navigateByUrl('/clients'),
      error: (error) => console.log(error),
    });
  }

  updateClient() {
    this.clientService
      .updateClient(this.clientId, this.clientForm.value)
      .subscribe({
        next: (result) => this.router.navigateByUrl('/clients'),
        error: (error) => console.log(error),
      });
  }

  actionButton() {
    if (this.clientId) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }
}
