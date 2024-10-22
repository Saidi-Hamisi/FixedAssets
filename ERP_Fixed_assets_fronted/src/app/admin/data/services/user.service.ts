import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../types/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const getAllUsersUrl = `${environment.apiUrl}/users/view`;

    return this.http.get<User[]>(getAllUsersUrl);
  }

   getLoggedInUserId(userId): Observable<User>{
    const usersUrl = `${environment.apiUrl}/users/find/${userId}`;
 
    return this.http.get<User>(usersUrl);
   }


  addUser(user: any): Observable<{ message: string }> {
    const registerUrl = `${environment.apiUrl}/users/signup`;

    return this.http.post<{ message: string }>(registerUrl, user);
  }

  getLockedAccounts(): Observable<User[]> {
    const lockedAccountsUrl = `${environment.apiUrl}/users/lockedaccounts`;

    return this.http.get<User[]>(lockedAccountsUrl);
  }

  getInactiveAccounts(): Observable<User[]> {
    const inactiveAccountsUrl = `${environment.apiUrl}/users/inactiveaccounts`;

    return this.http.get<User[]>(inactiveAccountsUrl);
  }

  getDeletedAccounts(): Observable<User[]> {
    const deletedAccountsUrl = `${environment.apiUrl}/users/deletedaccounts`;

    return this.http.get<User[]>(deletedAccountsUrl);
  }

  updateUser(user): Observable<{ message: string }> {
    const updateUserUrl = `${environment.apiUrl}/users/update`;

    return this.http.put<{ message: string }>(updateUserUrl, user);
  }

  deleteUser(username): Observable<{ message: string }> {
    const deleteUrl = `${environment.apiUrl}/users/deleteaccount`;

    return this.http.put<{ message: string }>(deleteUrl, username);
  }

  lockUserAccount(userDetails): Observable<{ message: string }> {
    const lockUserUrl = `${environment.apiUrl}/users/lockaccount`;

    return this.http.put<{ message: string }>(lockUserUrl, userDetails);
  }

  restoreDeletedAccount(username): Observable<{ message: string }> {
    const restoreDeletedaccountUrl = `${environment.apiUrl}/users/restoreaccount`;

    return this.http.put<{ message: string }>(
      restoreDeletedaccountUrl,
      username
    );
  }

  activateUserAccount(userDetails): Observable<{ message: string }> {
    const activateUserAccountUrl = `${environment.apiUrl}/users/update`;

    return this.http.put<{ message: string }>(
      activateUserAccountUrl,
      userDetails
    );
  }

  updateUserPassword(passwordDetails): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.apiUrl}/users/updatepassword`;

    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }

  logoutUser(username): Observable<{ message: string }> {
    const logoutUrl = `${environment.apiUrl}/auth/logout`;

    return this.http.post<{ message: string }>(logoutUrl, username);
  }

  updateDepartment(userDetails):Observable<{message: string}>{

    const updateDepartmentsUrl = `${environment.apiUrl}/users/updatedepartment`;

    return this.http.put<{message: string}>(updateDepartmentsUrl, userDetails)
  }

  updateRole(roleDetails): Observable<{message: string}>{
    const updateRoleUrl = `${environment.apiUrl}/users/updaterole`;

    return this.http.put<{message: string}>(updateRoleUrl, roleDetails)
  }
}

