import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RdfResult {
  head: {
    vars: Array<String>
  }
  results: {
    bindings: Array<any>
  }
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {

  }

  public postRCEQuery(query: string): Observable<RdfResult> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'X-Api-Key': `${environment.token}`
    });    

    return this.http.post<RdfResult>(`${environment.backendApiUrl}`, `query=${query}`, {
      headers: headers,
      responseType: "json"
    }).pipe(
      map((response) => {
        return response;
      })
      );
  }
}
