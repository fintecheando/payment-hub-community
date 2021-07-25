/** Angular Routes */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from 'app/core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RequestToPayService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private httpService: HttpService) { }

  getRequestsToPay() {
    return this.httpService.disableApiPrefix().get(this.httpService.getPaymentHubBaseUrl() + '/api/v1/transactionRequests', 
      {headers: this.httpService.getTenantHeaders()});
  }

  /*
  getRequestToPay(requestId: string): Observable<any> {
    return this.httpService.disableApiPrefix().get(this.httpService.getPaymentHubBaseUrl() + '/api/v1/transactionRequest/${requestId}', 
      {headers: this.httpService.getTenantHeaders()});
  }
  */

  getRequestToPay(id: string): Observable<any> {
    return this.httpService
     .disableApiPrefix()
      .get('/assets/mock/payment-hub/transaction-details.mock.json');
  }

}
