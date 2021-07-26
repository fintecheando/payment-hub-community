/** Angular Imports */
import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Interceptors */
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';

/**
 * HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly.
 * (see https://github.com/Microsoft/TypeScript/issues/13897)
 */
declare module '@angular/common/http/src/client' {

  /**
   * Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
   * HttpClient with HttpService using dependency injection.
   */
  export interface HttpClient {

    /**
     * Enables caching for this request.
     * @param {boolean} forceUpdate Forces request to be made and updates cache entry.
     * @returns {HttpClient} The new instance.
     */
    cache(forceUpdate?: boolean): HttpClient;

    /**
     * Skips default error handler for this request.
     * @returns {HttpClient} The new instance.
     */
    skipErrorHandler(): HttpClient;

    /**
     * Do not use API prefix for this request.
     * @returns {HttpClient} The new instance.
     */
    disableApiPrefix(): HttpClient;

  }

}

/**
 *  From @angular/common/http/src/interceptor: allows to chain interceptors
 */
class HttpInterceptorHandler implements HttpHandler {

  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) { }

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }

}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */
@Injectable()
export class HttpService extends HttpClient {

  fineractUrl: string;
  paymentHubUrl: string;
  headers: HttpHeaders;
  directFineract: string;

  constructor(private httpHandler: HttpHandler,
              private injector: Injector,
              @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = []) {
    super(httpHandler);

    if (!this.interceptors) {
      // Configure default interceptors that can be disabled here
      this.interceptors = [
        this.injector.get(ApiPrefixInterceptor),
        this.injector.get(ErrorHandlerInterceptor)
      ];
    }
    this.fineractUrl = "https://apis.flexcore.mx/V1.0/fineract-protected-movil";
    this.paymentHubUrl = "http://localhost:8800";
    this.directFineract = "https://apis.flexcore.mx/V1.0/fineract-protected"
  }

  cache(forceUpdate?: boolean): HttpClient {
    const cacheInterceptor = this.injector.get(CacheInterceptor).configure({ update: forceUpdate });
    return this.addInterceptor(cacheInterceptor);
  }

  skipErrorHandler(): HttpClient {
    return this.removeInterceptor(ErrorHandlerInterceptor);
  }

  disableApiPrefix(): HttpClient {
    return this.removeInterceptor(ApiPrefixInterceptor);
  }

  getFineractBaseUrl(): string {
    return this.fineractUrl;
  }

  getDirectFineractBaseUrl(): string {
    return this.directFineract;
  }

  getPaymentHubBaseUrl(): string {
    return this.paymentHubUrl;
  }

//  .set('Platform-TenantId', tenantId)
  setCustomHeaders(tenantId: string) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-gravitee-api-key', "f3384a1b-4d7a-4fd2-9a5b-44e7ff6842b0")
      .set('Authorization', "Basic NTUzMDAwMDAwMDphYjM4ZWFkYWViNzQ2NTk5ZjJjMWVlOTBmODI2N2YzMWY0NjczNDc0NjI3NjRhMjRkNzFhYzE4NDNlZTc3ZmUz");
  }

  getTenantHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Platform-TenantId', "tenant_default")
      .set('x-gravitee-api-key', "f3384a1b-4d7a-4fd2-9a5b-44e7ff6842b0")
      .set('Authorization', "Basic NTUzMDAwMDAwMDphYjM4ZWFkYWViNzQ2NTk5ZjJjMWVlOTBmODI2N2YzMWY0NjczNDc0NjI3NjRhMjRkNzFhYzE4NDNlZTc3ZmUz");
  }

  getDirectFineractHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Gravitee-Api-Key', 'a32d4ccd-c5b0-469f-aa49-0e3788d47d2e')
  }

  getCustomHeaders(): HttpHeaders {
    if (!this.headers) {
      this.setCustomHeaders('tenant_default');
    }
    return this.headers;
  }

  /**
   *  Override the original method to wire interceptors when triggering the request.
   */
  request(method?: any, url?: any, options?: any): any {
    const handler = this.interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
      this.httpHandler
    );
    return new HttpClient(handler).request(method, url, options);
  }

  private removeInterceptor(interceptorType: Function): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter(i => !(i instanceof interceptorType))
    );
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.concat([interceptor])
    );
  }

}
