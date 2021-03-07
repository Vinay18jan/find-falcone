import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalconeHomeComponent } from './falcone-home.component';

describe('FalconeHomeComponent', () => {
  let component: FalconeHomeComponent;
  let fixture: ComponentFixture<FalconeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalconeHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FalconeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
