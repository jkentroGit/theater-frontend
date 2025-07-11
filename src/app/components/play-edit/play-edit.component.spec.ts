import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayEditComponent } from './play-edit.component';

describe('PlayEditComponent', () => {
  let component: PlayEditComponent;
  let fixture: ComponentFixture<PlayEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
