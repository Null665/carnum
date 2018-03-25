import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnumListComponent } from './carnum-list.component';

describe('CarnumListComponent', () => {
  let component: CarnumListComponent;
  let fixture: ComponentFixture<CarnumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
