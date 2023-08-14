import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolicyonuserComponent } from './add-policyonuser.component';

describe('AddPolicyonuserComponent', () => {
  let component: AddPolicyonuserComponent;
  let fixture: ComponentFixture<AddPolicyonuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPolicyonuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPolicyonuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
