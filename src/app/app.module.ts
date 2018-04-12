import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete/dist/ng2-auto-complete.module';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { Ng2HighchartsModule } from 'ng2-highcharts';

import { routing }      from './routing';
import { Domains } from './domains';
import { Filters } from './filters';
import { TimeZoneService } from './timeZone.service';
import { ValidationService } from './validation.service';
import { StatusService } from './status.service';
import { PopupChange } from './popup-change';
import {InitChosen} from './initChosen';
import {GlobalLogin} from './global-login';
import { PopupInformationService } from './us-offers/popup-information/popup-information.service';
import { CheckboxTableService } from './checkbox-table/checkbox-table.service';
import { CalendarService } from './calendar/calendar.service';
import { CalendarPopupService } from './calendar-popup/calendar-popup.service';
import { PopupFilterDialogService } from './popup-filter-dialog/popup-filter-dialog.service';
import { PopupInvoiceService } from './popup-invoice/popup-invoice.service';
import { PopupReportsService } from './popup-reports/popup-reports.service';
import { OfferTypeService } from './offerType.service';
import { PopupScreensService } from './popup-screens/popup-screens.service';
import { PopupCorrectionsService } from './popup-corrections/popup-corrections.service';
import { PopupPaymentsCorrectionsService } from './popup-payments-corrections/popup-payments-corrections.service';
import { JwtInterceptor } from './jwt.interceptor';



import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { CountriesService } from './countries.service';
import { StatisticComponent } from './statistic/statistic.component';
import { TextMaskModule } from 'angular2-text-mask';
import {Ng2BreadcrumbModule, BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';
import { CustomizationComponent } from './settings/customization/customization.component';
import { CompanyProfileComponent } from './settings/company-profile/company-profile.component';
import { BillingInfoComponent } from './settings/billing-info/billing-info.component';
import { FaqComponent } from './settings/faq/faq.component';
import { ManagementComponent } from './settings/management/management.component';
import { PaymentsComponent } from './settings/payments/payments.component';
import { SystemComponent } from './settings/system/system.component';
import { HeaderComponent } from './header/header.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { CpaOfferComponent } from './add-offer/cpa-offer/cpa-offer.component';
import { CpcOfferComponent } from './add-offer/cpc-offer/cpc-offer.component';
import { DcpaOfferComponent } from './add-offer/dcpa-offer/dcpa-offer.component';
import { FallbackOfferComponent } from './add-offer/fallback-offer/fallback-offer.component';
import { OfferListComponent } from './add-offer/offer-list/offer-list.component';
import { PayoutsComponent } from './add-offer/payouts/payouts.component';
import { RenderOffer } from './add-offer/render-offer';
import { GlobalOffer } from './add-offer/global-offer';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './users/admin/admin.component';
import { PublishersComponent } from './users/publishers/publishers.component';
import { AdvertiserComponent } from './users/advertiser/advertiser.component';
import { AdvertisersListComponent } from './users/advertisers-list/advertisers-list.component';
import { UsersService } from './users/users.service';
import { FormstylerPipe } from './formstyler.pipe';
import { AdminListComponent } from './users/admin-list/admin-list.component';
import { PublishersListComponent } from './users/publishers-list/publishers-list.component';
import { AccountManagersComponent } from './users/account-managers/account-managers.component';
import { AccountManagersListComponent } from './users/account-managers-list/account-managers-list.component';
import { UsOffersComponent } from './us-offers/us-offers.component';
import { AddOfferStep1Component } from './us-offers/add-offer-step-1/add-offer-step-1.component';
import { PublisherListComponent } from './add-offer/publisher-list/publisher-list.component';
import { ChosenInputComponent } from './chosen-input/chosen-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { AddOfferStep2Component } from './us-offers/add-offer-step-2/add-offer-step-2.component';

import { PopupTable } from './popup-table/popup-table.component';
import { SelectBox } from './select-box/select-box.component';
import { CheckboxTableSelect } from './checkbox-table/checkbox-table-select.component';
import { CheckboxTableOne } from './checkbox-table/checkbox-table-one.component';
import { CheckboxTableAll } from './checkbox-table/checkbox-table-all.component';

import { PopupInformationComponent } from './us-offers/popup-information/popup-information.component';

import { AddBundleStep1Component } from './us-offers/bundle/add-bundle-step-1/add-bundle-step-1.component';
import { AddBundleStep2Component } from './us-offers/bundle/add-bundle-step-2/add-bundle-step-2.component';
import { AddBundleStep3Component } from './us-offers/bundle/add-bundle-step-3/add-bundle-step-3.component';
import { RenderUsOffer } from './us-offers/render-usoffer';
import { GlobalUsOffer } from './us-offers/global-usoffer';
import { CalendarComponent } from './calendar/calendar.component';
import { PopupFilterDialogComponent } from './popup-filter-dialog/popup-filter-dialog.component';
import { BundleListComponent } from './us-offers/bundle/bundle-list/bundle-list.component';
import { OfferBundleRenderComponent } from './offer-bundle-render/offer-bundle-render.component';
import { ServerTimeComponent } from './server-time/server-time.component';
import { PaymentComponent } from './payments/payments.component';
import { PopupInvoiceComponent } from './popup-invoice/popup-invoice.component';

import { GlobalUsers } from './users/global-users';
import { HomeComponent } from './home/home.component';
import { PopupReportsComponent } from './popup-reports/popup-reports.component';
import { PopupCorrectionsComponent } from './popup-corrections/popup-corrections.component';
import { PaymentsPublisherComponent } from './payments/payments-publisher/payments-publisher.component';
import { BreComponent } from './bre/bre.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { UsersBreadcrumbsService } from './users-breadcrumbs.service';
import { PopupScreensComponent } from './popup-screens/popup-screens.component';
import { ConversionComponent } from './statistic/conversion/conversion.component';
import { DetailComponent } from './statistic/detail/detail.component';
import { RenderStatistic } from './statistic/render-statistic';
import { BundleStatisticComponent } from './statistic/bundle-statistic/bundle-statistic.component';
import { BundleConversionsComponent } from './statistic/bundle-statistic/bundle-conversions/bundle-conversions.component';
import { BundleDetailComponent } from './statistic/bundle-statistic/bundle-detail/bundle-detail.component';
import { ChosenInputCountriesComponent } from './chosen-input-countries/chosen-input-countries.component';
import { PopupPaymentsCorrectionsComponent } from './popup-payments-corrections/popup-payments-corrections.component';
import { CalendarPopupComponent } from './calendar-popup/calendar-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    StatisticComponent,
    CustomizationComponent,
    CompanyProfileComponent,
    BillingInfoComponent,
    FaqComponent,
    ManagementComponent,
    PaymentsComponent,
    SystemComponent,
    HeaderComponent,
    AddOfferComponent,
    CpaOfferComponent,
    CpcOfferComponent,
    DcpaOfferComponent,
    FallbackOfferComponent,
    OfferListComponent,
    UsersComponent,
    AdminComponent,
    PublishersComponent,
    AdvertiserComponent,
    AdvertisersListComponent,
    FormstylerPipe,
    AdminListComponent,
    PublishersListComponent,
    AccountManagersComponent,
    AccountManagersListComponent,
    UsOffersComponent,
    AddOfferStep1Component,
    PublisherListComponent,
    PayoutsComponent,
    ChosenInputComponent,
    TextInputComponent,
    AddOfferStep2Component,
    TextInputComponent,
    PopupTable,
    SelectBox,
    CheckboxTableSelect,
    CheckboxTableOne,
    CheckboxTableAll,
    PopupInformationComponent,
    AddBundleStep1Component,
    AddBundleStep2Component,
    AddBundleStep3Component,
    CalendarComponent,
    PopupFilterDialogComponent,
    BundleListComponent,
    OfferBundleRenderComponent,
    ServerTimeComponent,
    PaymentComponent,
    PopupInvoiceComponent,
    HomeComponent,
    PopupReportsComponent,
    PopupCorrectionsComponent,
    PaymentsPublisherComponent,
    BreComponent,
    BreadcrumbComponent,
    PopupScreensComponent,
    GlobalOffer,
    GlobalUsOffer,
    GlobalUsers,
    ConversionComponent,
    DetailComponent,
    BundleStatisticComponent,
    BundleConversionsComponent,
    BundleDetailComponent,
    ChosenInputCountriesComponent,
    PopupPaymentsCorrectionsComponent,
    CalendarPopupComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    TextMaskModule,
    Ng2AutoCompleteModule,
    Ng2BreadcrumbModule.forRoot(),
    Ng2HighchartsModule
  ],
  providers: [
    CountriesService,
    TimeZoneService,
    ValidationService,
    Domains,
    RenderOffer,
    UsersService,
    Filters,
    StatusService,
    PopupChange,
    InitChosen,
    CheckboxTableService,
    PopupInformationService,
    GlobalLogin,
    HeaderComponent,
    BreadcrumbService,
    CalendarComponent,
    RenderUsOffer,
    PopupFilterDialogComponent,
    PopupFilterDialogService,
    CalendarService,
    CalendarPopupService,
    PopupInvoiceService,
    GlobalUsers,
    PopupReportsService,
    BreadcrumbComponent,
    UsersBreadcrumbsService,
    OfferTypeService,
    PopupScreensService,
    RenderStatistic,
    JwtInterceptor,
    PopupCorrectionsService,
    PopupPaymentsCorrectionsService
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
