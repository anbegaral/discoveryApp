import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterUserPage } from './register-user.page';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';

const routes: Routes = [
    {
        path: '',
        component: RegisterUserPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes)
    ],
    declarations: [RegisterUserPage],
    exports: [RouterModule],
    providers: [
        AngularFireAuth,
    ]
})
export class RegisterUserPageModule { }
