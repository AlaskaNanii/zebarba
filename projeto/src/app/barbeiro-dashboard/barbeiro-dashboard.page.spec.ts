import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarbeiroDashboardPage } from './barbeiro-dashboard.page';

describe('BarbeiroDashboardPage', () => {
  let component: BarbeiroDashboardPage;
  let fixture: ComponentFixture<BarbeiroDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbeiroDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
