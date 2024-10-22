import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = '/api/v1/notifications';

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get/all`);
  }

  getNotificationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`);
  }

  createNotification(notification: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, notification);
  }

  updateNotification(notification: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, notification);
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
