/**
 * Created by Алиска on 15.11.2016.
 */

export class Domains{
    urlLogIn: string = '/api/users/auth/login';
    domain: string = '';
    
    urlLogOut: string = '/api/users/auth/logout';
    urlRegistration: string = '/api/publishers/registration';

    csrf: string = '/api/csrf';
    
    urlSaveSettings: string = '/api/users/settings/company';
    urlSaveCustomization: string = '/api/settings/customization';
    urlSaveSystem: string = '/api/settings/system';
    urlSavePayments: string = '/api/users/settings/payments/';
    urlSaveBillingAdmin: string = '/api/settings/billinginfo';
    urlSaveBillingPublisher: string = '/api/publishers/settings';
    urlGetOfferType: string = '/api/offers/offers/update';
    urlGetAllOffer:string='/api/offers/offers/';
    urlGetUpdate:string='/api/offers/offers/update/';
    
    urlUsers:string='/api/';
  
    urlUpdate:string='/update/';
    // urlGetUpdateUsoffer:string='/api/offers/usoffers/update';
    urlUsersAdvertisersList:string='/api/usersa/index/';
   

    urlUsersAdminsList:string='/api/users/admins/';
    urlUsersPublishersList:string='/api/publishers/index/';
    urlUsersAccountManagersList:string='/api/accountmanagers/index/';
    urlGetsAdvertisersList:string='/api/usersa/list';
    urlGetsPaymentsAdveriserList:string='/api/payments/usersa/';
    urlGetsPaymentsPublisherList:string='/api/payments/publisher/';

    urlRestoreEmail: string = '/api/users/restore/send';
    urlTakePass: string = '/api/users/restore/reset';
    
    countries: string = '/api/countries';
    timeZones:string = '/api/timezones';
    categories:string='/api/offers/categories/list';
    deleteCategories:string='/api/offers/categories/delete/';
    addCategories:string='/api/offers/categories/add';

    urlAddOffer: string='/api/offers/offers/update?type=';

    urlGetStatus:string='/api/filter/columns';
    urlGetManagersList:string='/api/accountmanagers/list';

    urlGetUsOfferStep_1:string='/api/offers/usoffers/update/';

    urlGetOfferPublisherList:string='/api/offers/publishers/';

    urlGetOfferPayoutsList:string='/api/offers/payouts/';

    urlGetAllUsoffers:string='/api/offers/usoffers/index';

    getUnLock:string='/api/offers/usoffers/pend';

    urlUpdateAllBundle:string='/api/offers/bundles/update';
    urlGetAllBundle:string='/api/offers/bundles/index';
    getAllBundleFiter:string='/api/filter/columns?filterModel=bundle&attr=all';
    getServerTime:string='/api/time';

    getAdvertiserListReports:string='/api/payments/usersa/report?uuid=';
    getPublisherListReports:string='/api/payments/publisher/report?uuid=';

    getAdvertiserInvoice:string='/api/payments/usersa/invoice?uuid=';

    urlGetListOffersPublishers:string='/api/filter/columns?filterModel=home&attr=publishersoffers';
    // urlGetListPublishers:string='/api/filter/columns?filterModel=home&attr=listpublishers';

    getStatisticHome:string='/api/filter/columns?filterModel=home&attr=publishersoffers';
    sendStatistic:string='api/home/index/metricgraphs';
    sendChartStatistic:string='/api/home/index/chartgraph';
    getTableStatistic:string='/api/home/index/ranking';

    urlGetOfferStatisticList:string='/api/statistics/index';

    urlGetOfferDetailStatistic:string='/api/statistics/index/detail';
    urlGetOfferConversions:string='/api/statistics/index/conversions';

    urlGetBundleStatisticList:string='/api/statistics/index/bundle';
    urlGetBundleDetailStatistic:string='/api/statistics/index/bundle';
    urlGetBundleConversions:string='/api/statistics/index/conversionsbundle';

    downloadCSVPublisher:string='/api/payments/publisher/downloadcsv?uuid=';
    downloadCSVAdvertiser:string='/api/payments/usersa/downloadcsv?uuid=';
    resendCSVPublisher:string='/api/payments/publisher/sendover?uuid=';
    resendCSVAdvertiser:string='/api/payments/usersa/sendover?uuid=';
    getPublisherListCorrections:string='/api/payments/publisher/cor?uuid=';
    // getStatisticOffers:string='/api/filter/columns?filterModel=ho
    // getTame&attr=listpublishers&offer_id=';
}