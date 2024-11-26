import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAfAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockFirestore: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    // Cria mocks para dependências
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAfAuth = jasmine.createSpyObj('AngularFireAuth', ['authState']);
    mockFirestore = jasmine.createSpyObj('AngularFirestore', ['collection']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AngularFireAuth, useValue: mockAfAuth },
        { provide: AngularFirestore, useValue: mockFirestore },
      ],
    });

    guard = TestBed.inject(RoleGuard); // Instância do guard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Aqui você pode adicionar testes mais específicos para validar o comportamento do guard.
});
