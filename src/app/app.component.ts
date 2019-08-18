import { Component } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      SplashScreen.hide();
      StatusBar.setStyle({ style: StatusBarStyle.Light });
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
}
