import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Barbearia1Page } from './barbearia1.page';

describe('Barbearia1Page', () => {
  let component: Barbearia1Page;
  let fixture: ComponentFixture<Barbearia1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Barbearia1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
