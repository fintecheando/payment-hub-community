/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

import { HttpService } from 'app/core/http/http.service';

/**
 * Users service.
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpService) { }

  /**
   * @returns {Observable<any>} Users data
   */
  getUsers(): Observable<any> {
    return this.http.disableApiPrefix().get('/users', {headers: this.http.getCustomHeaders()});
  }

  /**
   * @returns {Observable<any>} Users template data
   */
  getUsersTemplate(): Observable<any> {
    return this.http.disableApiPrefix().get('/users/template', {headers: this.http.getCustomHeaders()});
  }

  /**
   * @param {any} user User to be created.
   * @returns {Observable<any>}
   */
  createUser(user: any): Observable<any> {
    return this.http.disableApiPrefix().post('/users', user, {headers: this.http.getCustomHeaders()});
  }

  /**
   * @param {string} userId user ID of user.
   * @returns {Observable<any>} User.
   */
  getUser(userId: string): Observable<any> {
    return this.http.disableApiPrefix().get(`/users/${userId}`, {headers: this.http.getCustomHeaders()});
  }

  /**
   * @param {string} userId user ID of user.
   * @returns {Observable<any>}
   */
  deleteUser(userId: string): Observable<any> {
    return this.http.disableApiPrefix().delete(`/users/${userId}`, {headers: this.http.getCustomHeaders()});
  }

  /**
   * @param {any} officeId ID of office to retrieve staff from.
   * @returns {Observable<any>} Staff data.
   */
  getStaff(officeId: any): Observable<any> {
    const httpParams = new HttpParams()
      .set('officeId', officeId.toString());
    return this.http.disableApiPrefix().get('/staff', { params: httpParams, headers: this.http.getCustomHeaders()});
  }

}
