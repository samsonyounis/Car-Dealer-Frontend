import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerdashboardComponent } from './buyerdashboard.component';

describe('BuyerdashboardComponent', () => {
  let component: BuyerdashboardComponent;
  let fixture: ComponentFixture<BuyerdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
