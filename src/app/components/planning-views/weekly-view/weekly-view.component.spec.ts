import 'zone.js/dist/zone-testing'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { WeeklyViewComponent } from './weekly-view.component';
import { routes } from 'src/app/app.module';
import { RouterModule } from '@angular/router';

describe('WeeklyViewComponent', () => {
  let component: WeeklyViewComponent;
  let fixture: ComponentFixture<WeeklyViewComponent>;
  let ui : any;

  beforeEach(  () => {
      TestBed.configureTestingModule({
      declarations: [ WeeklyViewComponent ],
      imports : [
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
            ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyViewComponent);
    component = fixture.componentInstance;
    ui = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    //check some static text content
    expect(ui.querySelector('jumpButton').textContent).toEqual('Jump to Today');
    expect(ui.querySelector('tooltiptext').textContent).toEqual('Previous Week');
    expect(ui.querySelector('tooltip tooltiptext').textContent).toEqual('Following Week');
    expect(ui.querySelector('span').textContent).toEqual('**Double click on any date to edit it in the daily view.**');  
  })
});
