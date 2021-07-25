/** TODO: Separate routing into feature modules for cleaner accounting module. */

/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Routing Imports */
import { Route } from '../core/route/route.service';

/** Translation Imports */

/** Custom Components */
import { IncomingTransactionsComponent } from './transactions/incoming/incoming-transactions.component';
import { TransactionDetailsComponent } from './transactions/transaction-details.component';
import { PaymentHubComponent } from './paymenthub.component';
import { IncomingRequestToPayComponent } from './request-to-pay/incoming-request-to-pay/incoming-request-to-pay.component';
import { OutgoingRequestToPayComponent } from './request-to-pay/outgoing-request-to-pay/outgoing-request-to-pay.component';
import { ViewRequestToPayComponent } from './request-to-pay/view-request-to-pay/view-request-to-pay.component';

import { CurrenciesResolver } from './transactions/resolver/currencies.resolver';
import { TransactionResolver } from './transactions/resolver/transaction.resolver';
import { OutgoingTransactionsComponent } from './transactions/outgoing/outgoing-transactions.component';
import { DfspResolver } from './transactions/resolver/dfsp.resolver';
import { RequestToPayResolver } from './request-to-pay/common-resolvers/request-to-pay.resolver';
import { ViewRequestToPayResolver } from './request-to-pay/common-resolvers/view-request-to-pay.resolver';

/** Payment HUB Routes */
const routes: Routes = [
  Route.withShell([
    {
      path: 'paymenthubee',
      data: { title: 'Payment Hub EE', breadcrumb: 'Payment Hub EE' },
      children: [
        {
          path: '',
          component: PaymentHubComponent
        },
        {
          path: 'incomingtransactions',
          data: { title: 'Search Incoming Transactions', breadcrumb: 'Incoming Transactions' },
          children: [
            {
              path: '',
              component: IncomingTransactionsComponent,
              resolve: {
                currencies: CurrenciesResolver,
                dfspEntries: DfspResolver
              }
            },
            {
              path: 'view/:id',
              component: TransactionDetailsComponent,
              data: { title: 'View Transaction', routeParamBreadcrumb: 'id' },
              resolve: {
                transaction: TransactionResolver,
                dfspEntries: DfspResolver
              }
            }
          ]
        },
        {
          path: 'outgoingtransactions',
          data: { title: 'Search Outgoing Transactions', breadcrumb: 'Outgoing Transactions' },
          children: [
            {
              path: '',
              component: OutgoingTransactionsComponent,
              resolve: {
                currencies: CurrenciesResolver,
                dfspEntries: DfspResolver
              }
            },
            {
              path: 'view/:id',
              component: TransactionDetailsComponent,
              data: { title: 'View Transaction', routeParamBreadcrumb: 'id' },
              resolve: {
                transaction: TransactionResolver,
                dfspEntries: DfspResolver
              }
            }
          ]
        },
        {
          path: 'incomingrequesttopay',
          data: { title: 'Search Incoming Request To Pay', breadcrumb: 'Incoming Request To Pay' },
          children: [
            {
              path: '',
              component: IncomingRequestToPayComponent,
              resolve: {
                requestsToPay: RequestToPayResolver,
                currencies: CurrenciesResolver,
                dfspEntries: DfspResolver
              }
            },
            {
              path: ':id',
              component: ViewRequestToPayComponent,
              data: { title: 'View Request To Pay', routeParamBreadcrumb: 'id' },
              resolve: {
                requestToPay: ViewRequestToPayResolver,
                dfspEntries: DfspResolver
              }
            },
          ]
        },
        {
          path: 'outgoingrequesttopay',
          data: { title: 'Search Outgoing Request To Pay', breadcrumb: 'Outgoing Request To Pay' },
          children: [
            {
              path: '',
              component: OutgoingRequestToPayComponent,
              resolve: {
                requestsToPay: RequestToPayResolver,
                currencies: CurrenciesResolver,
                dfspEntries: DfspResolver
              }
            },
            {
              path: ':id',
              component: ViewRequestToPayComponent,
              data: { title: 'View Request To Pay', routeParamBreadcrumb: 'id' },
              resolve: {
                requestToPay: ViewRequestToPayResolver,
                dfspEntries: DfspResolver
              }
            },
          ]
        },
      ]
    },
  ])
];

/**
 * Payment HUB Routing Module
 *
 * Configures the payment hub routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CurrenciesResolver,
    TransactionResolver,
    DfspResolver,
    RequestToPayResolver,
    ViewRequestToPayResolver
  ]
})
export class PaymentHubRoutingModule { }
