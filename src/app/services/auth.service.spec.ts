import 'zone.js/dist/zone-testing'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { MatCarouselModule } from 'ng-mat-carousel';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { routes } from '../app.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from './auth.guard';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthService, AuthGuard, AngularFireAuth, RouterModule]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({imports : [
      BrowserModule,
      RouterModule.forRoot(routes),
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebase),
      ReactiveFormsModule,
      MatIconModule,
      MatTooltipModule,
      MatButtonModule,
      MatMenuModule,
      MatCarouselModule.forRoot(),
      MatSelectModule,
      MatDialogModule,
      DragDropModule,
    ]});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
