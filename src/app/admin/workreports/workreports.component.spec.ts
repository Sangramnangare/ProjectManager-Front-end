import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkreportsComponent } from './workreports.component';

describe('WorkreportsComponent', () => {
  let component: WorkreportsComponent;
  let fixture: ComponentFixture<WorkreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
