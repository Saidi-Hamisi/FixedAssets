import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories():Observable<Category[]>{
    const categoriesUrl = `${environment.BASE_URL}/api/categories/get_categories`;

    return this.http.get<Category[]>(categoriesUrl);
  }

  public addCategory(category): Observable<{ message: string}>{
    const addCategoryUrl = `${environment.BASE_URL}/api/categories/add_category`;

    return this.http.post<{message: string}>(addCategoryUrl, category);
  }

  public updateCategoryService(category): Observable<{message: string}>{
    const updateCategoryUrl = `${environment.BASE_URL}/api/categories/updateCategory`;

    return this.http.put<{message: string}>(updateCategoryUrl, category);
  }

  public deleteCategory(categoryId): Observable<{message: string}>{
    const deletecategoryUrl = `${environment.BASE_URL}/api/categories/deleteCategory/${categoryId}`;

    return this.http.delete<{message: string}>(deletecategoryUrl);
  }
}
