import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksComponent } from './banks.component';

describe('BanksComponent', () => {
  let component: BanksComponent;
  let fixture: ComponentFixture<BanksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanksComponent]
    });
    fixture = TestBed.createComponent(BanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
