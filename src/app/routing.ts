/**
 * Created by Алиска on 13.12.2016.
 */
import { FormComponent } from './form/form.component';
import { StatisticComponent } from './statistic/statistic.component';
import { CustomizationComponent } from './settings/customization/customization.component';
import { BillingInfoComponent } from './settings/billing-info/billing-info.component';
import { CompanyProfileComponent } from './settings/company-profile/company-profile.component';
import { FaqComponent } from './settings/faq/faq.component';
import { ManagementComponent } from './settings/management/management.component';
import { PaymentsComponent } from './settings/payments/payments.component';
import { SystemComponent } from './settings/system/system.component';
import { OfferListComponent } from './add-offer/offer-list/offer-list.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { PublisherListComponent } from './add-offer/publisher-list/publisher-list.component';
import { PayoutsComponent } from './add-offer/payouts/payouts.component';
import {AdvertiserComponent} from './users/advertiser/advertiser.component';
import {AdvertisersListComponent} from './users/advertisers-list/advertisers-list.component';
import {AdminComponent} from './users/admin/admin.component';
import {AdminListComponent} from './users/admin-list/admin-list.component';
import {PublishersComponent} from './users/publishers/publishers.component';
import {PublishersListComponent} from './users/publishers-list/publishers-list.component';
import {AccountManagersComponent} from './users/account-managers/account-managers.component';
import {AccountManagersListComponent} from './users/account-managers-list/account-managers-list.component';
import {UsOffersComponent} from './us-offers/us-offers.component';
import {AddOfferStep1Component} from './us-offers/add-offer-step-1/add-offer-step-1.component';
import {AddOfferStep2Component} from './us-offers/add-offer-step-2/add-offer-step-2.component';
import {AddBundleStep1Component} from './us-offers/bundle/add-bundle-step-1/add-bundle-step-1.component';
import {AddBundleStep2Component} from './us-offers/bundle/add-bundle-step-2/add-bundle-step-2.component';
import {AddBundleStep3Component} from './us-offers/bundle/add-bundle-step-3/add-bundle-step-3.component';
import {BundleListComponent} from './us-offers/bundle/bundle-list/bundle-list.component';
import { PaymentComponent } from './payments/payments.component';
import { PaymentsPublisherComponent } from './payments/payments-publisher/payments-publisher.component';
import { HomeComponent } from './home/home.component';
import { ConversionComponent } from './statistic/conversion/conversion.component';
import { DetailComponent } from './statistic/detail/detail.component';
import { BundleStatisticComponent } from './statistic/bundle-statistic/bundle-statistic.component';
import { BundleConversionsComponent } from './statistic/bundle-statistic/bundle-conversions/bundle-conversions.component';
import { BundleDetailComponent } from './statistic/bundle-statistic/bundle-detail/bundle-detail.component';



import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule} from '@angular/router';

export const AppRoutes: Routes = [
    { path: '', component: FormComponent },
    { path: 'home', component: HomeComponent,
        data: {
        breadcrumb: "Home"
    }
    },
    
    { path: 'settings/customization', component: CustomizationComponent,
        data: {
            breadcrumb: "Settings Customization"
        }
    },
    { path: 'settings/billing-info', component:  BillingInfoComponent,
        data: {
            breadcrumb: "Settings Billing info"
        }
    },
    { path: 'settings/company-profile', component:  CompanyProfileComponent,
        data: {
            breadcrumb: "Settings Company profile"
        }
    },
    { path: 'settings/faq', component: FaqComponent },
    { path: 'settings/management', component: ManagementComponent },
    { path: 'settings/payments', component: PaymentsComponent,
        data: {
            breadcrumb: "Settings Payments"
        }
    },
    { path: 'settings/system', component: SystemComponent,
        data: {
            breadcrumb: "Settings System"
        }
    },
    
    
    
    { path: 'offer/offer-list/add-offer', component: AddOfferComponent,
        data: {
            breadcrumb: 'Add offer',
            name:'Add offer'
        }
    },
    // { path: 'offer/offer-list/update', component: AddOfferComponent,
    //     data: {
    //         breadcrumb: 'Update',
    //     }
    // },
    { path: 'offer/offer-list/update/:id', component: AddOfferComponent,
        data: {
            breadcrumb: '',
            name:'Update offer'
        }
    },
    { path: 'offer/offer-list', component: OfferListComponent,
        data: {
            breadcrumb: "Offers"
        }
    },
    { path: 'offer/offer-list/publisher-list/:id', component: PublisherListComponent,
        data: {
            breadcrumb: '',
            name:'offerpublishers'
        }
    },
    
    

    { path: 'users/advertiser-list/add-advertiser', component: AdvertiserComponent,
        data: {
            breadcrumb: 'Add account',
            name:'Add advertiser'
        }
    },
    { path: 'users/advertiser-list/update/:id', component: AdvertiserComponent,
        data: {
            breadcrumb: '',
            name:'Update advertiser'
        }
    },
    { path: 'users/advertiser-list', component: AdvertisersListComponent,
        data: {
            breadcrumb: 'Advertiser',
        }
    },
    
    
    { path: 'users/admin-list/add-admin', component: AdminComponent,
        data: {
            breadcrumb: 'Add account',
            name:'Add admin'
        }
    },
    { path: 'users/admin-list/update/:id', component: AdminComponent,
        data: {
            breadcrumb: '',
            name:'Update admin'
        }
    },
    { path: 'users/admin-list', component: AdminListComponent,
        data: {
            breadcrumb: 'Admin',
        }
    },
    
    
    { path: 'users/publisher-list/add-publisher', component: PublishersComponent,
        data: {
            breadcrumb: 'Add account',
            name:'Add publisher'
        }
    },
    { path: 'users/publisher-list/update/:id', component: PublishersComponent,
        data: {
            // breadcrumb: 'Update '+ localStorage.getItem("user_name"),
            breadcrumb: '',
            name:'Update publisher'
        }
    },
    { path: 'users/publisher-list', component: PublishersListComponent,
        data: {
        breadcrumb: "Publisher"
        }
    },
    { path: 'users/publisher-list/payouts/:id', component: PayoutsComponent,
        data: {
            breadcrumb: '',
            name: 'Update payouts',
        }
    },
    
    { path: 'users/accountmanager-list/add-accountmanager', component: AccountManagersComponent,
        data: {
            breadcrumb: 'Add account',
            name:'Add accountmanager'
        }
    },
    { path: 'users/accountmanager-list/update/:id', component: AccountManagersComponent,
        data: {
            breadcrumb: '',
            name:'Update accountmanager'
        }
    },
    { path: 'users/accountmanager-list', component: AccountManagersListComponent,
        data: {
            breadcrumb: 'Account manager',
        }
    },
    
    
    { path: 'users/usoffer-list', component: UsOffersComponent,
        data: {
            breadcrumb: 'Offers',
        }
    },
    { path: 'users/usoffer-list/add-usoffer-step-1', component: AddOfferStep1Component,
        data: {
            breadcrumb: 'Add offer step one',
        }
    },
    { path: 'users/usoffer-list/add-usoffer-step-2', component: AddOfferStep2Component,
        data: {
            breadcrumb: 'Add offer',
            name:'Add usoffer'
        }
    },
    { path: 'users/usoffer-list/update-usoffer-step-2/:id', component: AddOfferStep2Component,
        data: {
            breadcrumb: '',
            name:'Update usoffer'
        }
    },
    
    { path: 'users/bundle-list/add-bundle-step-1', component: AddBundleStep1Component,
        data: {
            breadcrumb: 'Step 1',
        }
    },
    { path: 'users/bundle-list/add-bundle-step-2', component: AddBundleStep2Component,
        data: {
            breadcrumb: 'Step 2',
        }
    },
    { path: 'users/bundle-list/add-bundle-step-3', component: AddBundleStep3Component,
        data: {
            breadcrumb: 'Step 3',
            name:'Add bundleoffer'
        }
    },
    { path: 'users/bundle-list/update-bundle-step-3/:id', component: AddBundleStep3Component,
        data: {
            breadcrumb: 'Step 3',
            name:'Update bundleoffer'
        }
    },
    { path: 'users/bundle-list', component: BundleListComponent,
        data: {
            breadcrumb: 'Bundle offers',
        }
    },

    { path: 'payments/advertiser-payments-list', component: PaymentComponent,
        data: {
            breadcrumb: 'Advertiser',
        }
    },
    { path: 'payments/publisher-payments-list', component: PaymentsPublisherComponent,
        data: {
            breadcrumb: 'Publisher',
        }
    },
    { path: 'statistic/offers-list', component: StatisticComponent,
        data: {
            breadcrumb: 'Statistic Offers',
        }
    },
    { path: 'statistic/offers-list/conversions/:id', component: ConversionComponent,
        data: {
            breadcrumb: '',
            name:'conversionsStatistic'
        }
    },
    { path: 'statistic/offers-list/detail-statistic/:id', component: DetailComponent,
        data: {
            breadcrumb: '',
            name: 'detailStatistic'
        }
    },
    { path: 'statistic/bundles-list', component: BundleStatisticComponent,
        data: {
            breadcrumb: 'Statistic Bundle offers',
        }
    },
    { path: 'statistic/bundles-list/conversions/:id', component: BundleConversionsComponent,
        data: {
            breadcrumb: '',
            name: 'conversionsBundle'
        }
    },
    { path: 'statistic/bundles-list/detail-statistic/:id', component: BundleDetailComponent,
        data: {
            breadcrumb: '',
            name: 'detailStatisticBundle'
        }
    },

    
];
export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);