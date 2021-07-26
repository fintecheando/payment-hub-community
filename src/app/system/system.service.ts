/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

import { HttpService } from 'app/core/http/http.service';


/**
 * System service.
 */
@Injectable({
  providedIn: 'root'
})
export class SystemService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpService) { }

  /**
   * @returns {Observable<any>} Fetches Roles and Permissions
   */
  getRoles(): Observable<any> {
    return this.http.disableApiPrefix().get(this.http.getFineractBaseUrl() + '/roles', {headers: this.http.getCustomHeaders()});
  }

  /**
   * @param {any} role Role to be created.
   * @returns {Observable<any>}
   */
  createRole(role: any): Observable<any> {
    return this.http.disableApiPrefix().post(this.http.getFineractBaseUrl() + '/roles', role, {headers: this.http.getCustomHeaders()});
  }

  /**
   * @param {any} filterBy Properties by which entries should be filtered.
   * @param {string} orderBy Property by which entries should be sorted.
   * @param {string} sortOrder Sort order: ascending or descending.
   * @param {number} offset Page offset.
   * @param {number} limit Number of entries within the page.
   * @returns {Observable<any>} Audit Trails.
   */
  getAuditTrailsTmp(filterBy: any, orderBy: string, sortOrder: string, offset: number, limit: number): Observable<any> {
    let httpParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('sortOrder', sortOrder)
      .set('orderBy', orderBy)
      .set('paged', 'true');
    // filterBy: actionName, entityName, resourceId, makerId, makerDateTimeFrom, makerDateTimeTo, checkerId, checkerDateTimeFrom, checkerDateTimeTo, processingResult
    filterBy.forEach(function (filter: any) {
      if (filter.value !== '') {
        httpParams = httpParams.set(filter.type, filter.value);
      }
    });
    return this.http.disableApiPrefix().get(this.http.getFineractBaseUrl() + '/audits', { params: httpParams, headers: this.http.getCustomHeaders() });
  }

  getAuditTrails(filterBy: any, orderBy: string, sortOrder: string, offset: number, limit: number): Observable<any> {
    return this.http
     .disableApiPrefix()
      .get('/assets/mock/audits.mock.json');
  }

  /**
   * @param {string} auditTrailId Audit Trail ID.
   * @returns {Observable<any>}
   */
  getAuditTrail(auditTrailId: string): Observable<any> {
    return this.http.disableApiPrefix().get(this.http.getFineractBaseUrl() + `/audits/${auditTrailId}`, {headers: this.http.getCustomHeaders()});
  }

  /**
   * @returns {Observable<any>} Audit Trail Search Template.
   */
  getAuditTrailSearchTemplate(): Observable<any> {
    return this.http
     .disableApiPrefix()
      .get('/assets/mock/audittemplate.mock.json');
  }

}
