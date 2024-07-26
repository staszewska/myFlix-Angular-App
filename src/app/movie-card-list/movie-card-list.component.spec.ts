import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardListComponent } from './movie-card-list.component';

describe('MovieCardComponent', () => {
  let component: MovieCardListComponent;
  let fixture: ComponentFixture<MovieCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
