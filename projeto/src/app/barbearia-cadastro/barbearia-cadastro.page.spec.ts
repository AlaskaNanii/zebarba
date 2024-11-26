import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarbeariaCadastroPage } from './barbearia-cadastro.page';

describe('BarbeariaCadastroPage', () => {
  let component: BarbeariaCadastroPage;
  let fixture: ComponentFixture<BarbeariaCadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbeariaCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
