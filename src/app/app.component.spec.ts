import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let originalSplashScreen;
  let originalStatusBar;
  let platform;

  beforeEach(async(() => {
    originalSplashScreen = Plugins.SplashScreen;
    originalStatusBar = Plugins.StatusBar;
    Plugins.StatusBar = jasmine.createSpyObj('StatusBar', ['setStyle', 'setBackgroundColor']);
    Plugins.SplashScreen = jasmine.createSpyObj('StatusBar', ['hide']);
    platform = jasmine.createSpyObj('Platform', { is: false });
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Platform, useValue: platform }]
    }).compileComponents();
  }));

  afterEach(() => {
    Plugins.StatusBar = originalStatusBar;
    Plugins.SplashScreen = originalSplashScreen;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('initialization', () => {
    it('hides the splash screen', () => {
      TestBed.createComponent(AppComponent);
      expect(Plugins.SplashScreen.hide).toHaveBeenCalledTimes(1);
    });

    it('sets the light style', () => {
      TestBed.createComponent(AppComponent);
      expect(Plugins.StatusBar.setStyle).toHaveBeenCalledTimes(1);
      expect(Plugins.StatusBar.setStyle).toHaveBeenCalledWith({
        style: StatusBarStyle.Light
      });
    });
  });
});
