import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartmentUnit } from '../types/department-unit';

@Injectable({
  providedIn: 'root'
})
export class DepartmentUnitsService {

  constructor(private http: HttpClient) { }

  public getDepartmentUnits(): Observable<DepartmentUnit[]>{
    const departmentUnitsUrl = `${environment.BASE_URL}/api/departmentUnit/getDepartmentunits`;
    
    return this.http.get<DepartmentUnit[]>(departmentUnitsUrl);
  }

  public addDepartmentUnit(department): Observable<{message: string}>{
    const addepartmentUnitUrl = `${environment.BASE_URL}/api/departmentUnit/newDepartmentunit`;

    return this.http.post<{message: string}>(addepartmentUnitUrl, department)
  }

  public updateDepartmentUnit(department): Observable<{message: string}>{
    const updateDepartmentUnitUrl = `${environment.BASE_URL}/api/departmentUnit/updateDepartmentunit`;

    return this.http.put<{message: string}>(updateDepartmentUnitUrl, department)
  }

  public deleteDepartmentunit(departmentUnitId): Observable<{message: string}>{
    const deleteDepartmentUrl = `${environment.BASE_URL}/api/departmentUnit/deleteDepartmentunit/${departmentUnitId}`;

    return this.http.delete<{message: string}>(deleteDepartmentUrl);
  }
}
