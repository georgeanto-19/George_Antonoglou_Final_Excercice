import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem("access_token");
    const API_URL = localStorage.getItem('appBaseUrl');

    // Determine the request path (support absolute URLs and relative paths)
    let path: string;
    try {
      const url = new URL(req.url);
      path = url.pathname;
    } catch (e) {
      // Not an absolute URL - use the request url as-is
      path = req.url;
    }

    // Only apply to API requests (paths that start with /api)
    const shouldApply = !!(authToken && API_URL && (path.startsWith(API_URL + '/api') || path.startsWith('/api')));

    if (shouldApply) {
      const clonedReq = req.clone({
        headers: req.headers.set("Authorization","Bearer " + authToken),
        // setHeaders: {
        //   'Authorization': authToken!
        // }
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}