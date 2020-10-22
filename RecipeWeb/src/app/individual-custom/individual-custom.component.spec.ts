import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCustomComponent } from './individual-custom.component';

describe('IndividualCustomComponent', () => {
  let component: IndividualCustomComponent;
  let fixture: ComponentFixture<IndividualCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
