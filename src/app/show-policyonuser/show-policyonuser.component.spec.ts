import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPolicyonuserComponent } from './show-policyonuser.component';

describe('ShowPolicyonuserComponent', () => {
  let component: ShowPolicyonuserComponent;
  let fixture: ComponentFixture<ShowPolicyonuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPolicyonuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPolicyonuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
