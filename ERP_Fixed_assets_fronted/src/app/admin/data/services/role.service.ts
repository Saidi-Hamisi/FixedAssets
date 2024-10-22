import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../types/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
z
  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<Role[]>{
    const getAllRolesUrl = `${environment.apiUrl}/roles/view`;

    return this.http.get<Role[]>(getAllRolesUrl);
  }

  addAndUpdateUserRole(user: any): Observable<{message: string}>{
    const updateUserRoleUrl = `${environment.apiUrl}/roles/add`;

    return this.http.post<{message: string}>(updateUserRoleUrl, user)
  }

  deleteRole(roleId: number): Observable<any>{
    const deleteRole = `${environment.apiUrl}/roles/delete/${roleId}`;

    return this.http.delete(deleteRole)
  }
}
