import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroAuthComponent } from './intro-auth.component';

describe('IntroAuthComponent', () => {
  let component: IntroAuthComponent;
  let fixture: ComponentFixture<IntroAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
