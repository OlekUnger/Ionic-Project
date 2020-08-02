import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffersPage } from './offers.page';

const routes: Routes = [
    {
        path: '',
        component: OffersPage,
    },
    {
        path: 'new',
        pathMatch: 'full',
        loadChildren: () => import('./new-offer/new-offer.module').then(m => m.NewOfferPageModule)
    },
    // {
    //   path: ':placeId',
    //   loadChildren: () => import('./offer-bookings/offer-bookings.module').then(m => m.PlaceBookingsPageModule)
    // },
    {
        path: 'edit/:placeId',
        pathMatch: 'full',
        loadChildren: () => import('./edit-offer/edit-offer.module').then(m => m.EditOfferPageModule)
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OffersPageRoutingModule {
}
