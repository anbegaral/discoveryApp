import { UserService } from './../../services/user.service';
import { SqliteServiceProvider } from './../../services/sqlite-service';

import { User, Audioguide } from './../../services/models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { PasswordValidator } from 'src/app/utils/PasswordValidator';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.page.html',
    styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

    registerForm: FormGroup;
    matching_passwords_group: FormGroup;
    users: User[];
    newUser = new User();
    idAudioguide: string;

    loader: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public fireAuth: AngularFireAuth,
        private storage: Storage,
        public formBuilder: FormBuilder,
        private loadingCtrl: LoadingController,
        private sqliteService: SqliteServiceProvider,
        private userService: UserService,
        private route: ActivatedRoute,
        public translate: TranslateService,
        // private utils: Utils,
    ) {
        this.idAudioguide = this.route.snapshot.paramMap.get('id');
        console.log(this.idAudioguide);
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
            password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
        });
        this.matching_passwords_group = new FormGroup({
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
                // this is for the letters (both uppercase and lowercase) and numbers validation
            ])),
            confirm_password: new FormControl('', Validators.required)
        }, (formGroup: FormGroup) => {
            return PasswordValidator.areEqual(formGroup);
        });
    }

    async presentLoadingWithOptions(message) {
        const loading = await this.loadingCtrl.create({
            spinner: 'bubbles',
            duration: 500,
            message: message,
            translucent: true,
            //   cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }

    registerUser() {
        this.presentLoadingWithOptions('Creating your account...');

        this.fireAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
            .then(
                () => {
                    this.storage.set('useremail', this.registerForm.value.email);
                    this.storage.set('isLoggedin', true);
                    this.storage.set('isAuthor', false);
                    this.addUser();
                    this.loader.dismiss();
                    this.storage.get('useremail').then((email) => console.log(email)).catch(error => console.log(error));
                    this.sqliteService.getDatabaseState().subscribe(ready => {
                        if (ready) {
                            this.buyAudioguide();
                        }
                    });
                }
            ).catch(
                (error) => {
                    this.loader.dismiss();
                    // this.utils.handlerError(error);
                }
            );
    }

    addUser() {
        this.newUser.isAuthor = false;
        this.newUser.email = this.registerForm.value.email;
        this.userService.addUser(this.newUser);
        this.newUser = new User(); // reset user
    }

    buyAudioguide() {
        // TODO sistema de compra
        console.log(`buyAudioguide in register-user ` + this.idAudioguide);
        this.sqliteService.getAudioguide(this.idAudioguide).then(audioguide =>
            this.sqliteService.addAudioguide(audioguide)
                .then(() => {
                    this.navCtrl.navigateForward('tabs/myguides');
                }).catch(error => console.log(error))
        ).catch(error => console.log(error));
    }

    cancel() {
        this.navCtrl.pop();
    }
}
