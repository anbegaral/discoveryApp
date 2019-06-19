import { Storage } from '@ionic/storage';
import { PlayGuideProvider } from './../../services/play-service';
import { SqliteServiceProvider } from './../../services/sqlite-service';
import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Audioguide, POI } from './../../services/models';
import { Platform, ActionSheetController, NavController, AlertController } from '@ionic/angular';
@Component({
    selector: 'app-myGuides',
    templateUrl: 'myGuides.page.html',
    styleUrls: ['myGuides.page.scss']
})
export class MyGuidesPage implements OnInit {
    audioguidesList: Audioguide[] = [];
    poiListComplete: POI[] = [];
    poiList: POI[] = [];
    locationList = new Set();
    audioguidesByLocation: Audioguide[] = [];
    myguidesSegment: string;
    isAuthor: boolean;
    isLoggedin: boolean;
    idAuthor: string = '';
    storageDirectory: any;
    newAudioguide: boolean = false;
    newPoi: boolean = false;
    hidden: boolean = true;

    isPlaying: any = false;

    constructor(public navCtrl: NavController,
        public platform: Platform,
        private file: File,
        private alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        private sqliteService: SqliteServiceProvider,
        private storage: Storage,
        private playService: PlayGuideProvider) {}

    ngOnInit() {
        console.log('ionviewwillenter')
        this.storage.get('isLoggedin').then(isLoggedin => {
            console.log('isLoggedin ' + isLoggedin);
            this.isLoggedin = isLoggedin;

            if (this.isLoggedin) {
                this.storage.get('isAuthor').then(isAuthor => {
                    console.log('isAuthor ' + isAuthor);
                    this.isAuthor = isAuthor;

                    if (this.isAuthor) {
                        this.storage.get('idAuthor').then(idAuthor => {
                            console.log('idAuthor ' + idAuthor);
                            this.idAuthor = idAuthor;
                        });
                    }
                });
            }

        }).then(() => {
            this.platform.ready().then(() => {
                console.log('myGuides', this.platform.is('android'));
                if (this.platform.is('ios')) {
                    this.storageDirectory = this.file.dataDirectory;
                } else if (this.platform.is('android')) {
                    this.storageDirectory = this.file.dataDirectory;
                } else {
                    // exit otherwise, but you could add further types here e.g. Windows
                    return false;
                }
                this.listMyAudioguides();
            }).catch(error => console.log('platform ready', error));
        }).catch(error => console.log('isloggedin ', error));
    }

    listMyAudioguides() {
        this.sqliteService.findAudioguides().then(data => {
            console.log(data);
            if (data !== null && data !== undefined) {
                this.audioguidesList = data;
                if (this.audioguidesList.length > 0) {
                    this.audioguidesList.forEach(audioguide => this.locationList.add(audioguide.location));
                }
            }
        }).catch(error => {
            // this.utils.handlerError(error);
            console.log('error listMyAudioguides ' + error);
        });
        this.sqliteService.findPois().then(pois => {
            if (pois !== null && pois !== undefined) {
                this.poiList = pois;
                this.poiListComplete = this.poiList;
            }
        }).catch(error => {
            // this.utils.handlerError(error)
            console.log(error);
        });

    }

    initializeAudioguideList() {
        this.audioguidesByLocation = this.audioguidesList;
        this.poiList = this.poiListComplete;
    }

    listAudioguidesByLocation(location: string) {
        this.initializeAudioguideList();
        this.audioguidesByLocation = this.audioguidesByLocation.filter(audioguide => audioguide.location === location);
        Array.from(document.querySelectorAll('.openable' + location)).forEach(element => {
            element.classList.toggle('hidden');
        });
    }

    toggleExpanded(id: number) {
        this.initializeAudioguideList();
        this.poiList = this.poiListComplete.filter(poi => poi.idAudioguide === id);
        Array.from(document.querySelectorAll('.openable' + id)).forEach(element => {
            element.classList.toggle('hidden');
        });
    }

    delete(id: number) {
        // this.alertCtrl.create({
        //     title: 'Delete audioguide',
        //     message: 'Are you sure you want to delete the selected audioguide?',
        //     buttons: [
        //         {
        //             text: 'Cancel',
        //             handler: data => console.log('Delete canceled ' + data)
        //         },
        //         {
        //             text: 'Delete',
        //             handler: data => {
        //                 this.sqliteService.getDatabaseState().subscribe(ready => {
        //                     if (ready) {
        //                         this.sqliteService.deleteAudioguide(id).then(() => {
        //                             this.listMyAudioguides();
        //                         });
        //                     }
        //                 });
        //             }
        //         }
        //     ]
        // }).present();
    }

    registerContributor() {
        // this.navCtrl.navigateForward('RegisterContributorPage')
    }

    login() {
        // this.navCtrl.navigateForward('LoginPage')
    }

    showNewAudioguide() {
        // let modal = this.modalCtrl.create(CreateAudioguideComponent);
        // modal.present();
    }

    showNewPoi() {
        // let modal = this.modalCtrl.create(CreatePoiComponent);
        // modal.present();
    }

    startRecordPoi(idAudioguide: string) {
        this.playService.startRecord('malaga1.mp3');
    }

    stopRecordPoi(idAudioguide: string) {
        this.playService.stopRecord();
    }

    playRecordPoi(idAudioguide: string) {
        this.playService.listen('malaga1.mp3');
    }

    listen(filename) {
        this.playService.listenStreaming(filename);
        this.playService.isPlaying.subscribe(isPlaying => this.isPlaying = isPlaying);
    }

    pause() {
        this.playService.pause();
        this.playService.isPlaying.subscribe(isPlaying => this.isPlaying = isPlaying);
    }

    stop() {
        this.playService.stop();
        this.playService.isPlaying.subscribe(isPlaying => this.isPlaying = isPlaying);
    }
}
