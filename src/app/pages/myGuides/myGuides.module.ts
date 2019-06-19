import { SqliteServiceProvider } from './../../services/sqlite-service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyGuidesPage } from './MyGuides.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild([{ path: '', component: MyGuidesPage }])
  ],
  declarations: [MyGuidesPage],
  providers: [SqliteServiceProvider]
})
export class MyGuidesPageModule {}
