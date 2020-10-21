import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingIngredientDialogComponent } from './missing-ingredient-dialog.component';

describe('MissingIngredientDialogComponent', () => {
  let component: MissingIngredientDialogComponent;
  let fixture: ComponentFixture<MissingIngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingIngredientDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
