import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'home',
                children: [
                    {
                        path: 'list-guides/:id',
                        loadChildren: '../pages/list-guides/list-guides.module#ListGuidesPageModule'
                    }
                ]
            },
            {
                path: 'home',
                children: [
                    {
                        path: 'view-guide/:id',
                        loadChildren: '../components/view-guide/view-guide.module#ViewGuideComponentModule'
                    }
                ]
            },
            {
                path: 'home',
                children: [
                    {
                        path: 'register-user/:id',
                        loadChildren: '../pages/register-user/register-user.module#RegisterUserPageModule'
                    }
                ]
            },
            {
                path: 'myGuides',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/myGuides/myGuides.module#MyGuidesPageModule'
                    }
                ]
            },
            {
                path: 'walk',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/walk/walk.module#WalkPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
