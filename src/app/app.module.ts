import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { FilesServiceProvider } from './services/files-service';
import { Media, MediaObject } from '@ionic-native/media/ngx';

import { PreloadImageComponentModule } from './components/preload-image/preload-image.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
  }

export const firebaseConfig = {
    apiKey: 'AIzaSyB0uWbXfQ3QauZzCoJZ8DjZi-PFkYEOYTQ',
    authDomain: 'discoveryag-15cc2.firebaseapp.com',
    databaseURL: 'https://discoveryag-15cc2.firebaseio.com',
    projectId: 'discoveryag-15cc2',
    storageBucket: 'discoveryag-15cc2.appspot.com',
    messagingSenderId: '79539419393'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot({
        name: '__mydb',
           driverOrder: ['sqlite', 'websql', 'indexeddb']
      }),
      AppRoutingModule,
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(firebaseConfig),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      HttpClientModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    TranslateService,
    SQLite,
    FilesServiceProvider,
    File,
    FileTransfer,
    Media,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports: [
    TranslateModule
  ]
})
export class AppModule {}
