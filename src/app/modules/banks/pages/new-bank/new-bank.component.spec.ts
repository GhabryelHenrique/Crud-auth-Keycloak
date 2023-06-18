/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewBankComponent } from './new-bank.component';

describe('NewBankComponent', () => {
  let component: NewBankComponent;
  let fixture: ComponentFixture<NewBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
