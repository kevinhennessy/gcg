import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from './product';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];
  collectionsUrl =
    'https://api.mongolab.com/api/1/databases/gcgear/collections';
  apiKey = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
  params = '?apiKey=' + this.apiKey;

  constructor(public http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.collectionsUrl + '/products' + this.params)
      .pipe(catchError(this.handleError('getAll', [])));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.collectionsUrl + '/products' + this.params)
      .pipe(
        map((products: Array<any>) => {
          const result: Product[] = [];
          if (products) {
            products.forEach((product) => {
              if (product.category === category) {
                result.push(product);
              }
            });
          }
          return result;
        }),
        catchError(this.handleError('getProductsByCategory', []))
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.collectionsUrl + '/products/' + id + this.params)
      .pipe(catchError(this.handleError<Product>(`getProductById id=${id}`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        console.log('HTTP 404 Not found error');
        return of(result as T);
      } else {
        console.error(error);
        return throwError('An error occurred:', error.error.message);
      }
    };
  }
}






