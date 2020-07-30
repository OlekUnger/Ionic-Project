import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
    {
        path: '',
        component: PlacesPage,
        children: [
            {
                path: '',
                redirectTo: '/places/discover',
                pathMatch: 'full'
            },
            /** tabs */
            // {
            //     path: 'discover-page',
            //     redirectTo: '/places/discover',
            //     pathMatch: 'full',
            // },
            // {
            //     path: 'offers',
            //     redirectTo: '/places/offers',
            //     pathMatch: 'full',
            // },
            /** end tabs */
            {
                path: 'discover',
                loadChildren: () => import('./discover/discover.module').then(m => m.DiscoverPageModule)
            },
            {
                path: 'offers',
                loadChildren: () => import('./offers/offers.module').then(m => m.OffersPageModule)
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlacesPageRoutingModule {
}
