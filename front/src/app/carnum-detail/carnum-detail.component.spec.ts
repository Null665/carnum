import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnumDetailComponent } from './carnum-detail.component';

describe('CarnumDetailComponent', () => {
  let component: CarnumDetailComponent;
  let fixture: ComponentFixture<CarnumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnumDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
