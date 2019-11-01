import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultComponent2Component } from './default-component2.component';

describe('DefaultComponent2Component', () => {
  let component: DefaultComponent2Component;
  let fixture: ComponentFixture<DefaultComponent2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultComponent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
