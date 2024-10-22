import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class LeaseService {

  constructor(private http: HttpClient) { }

  getLessors(): Observable<any> {
    const lessorsUrl = `${environment.BASE_URL}/api/v1/lessor/get/all`;
    return this.http.get<any[]>(lessorsUrl);
  }
  getLessorById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/api/v1/lessor/find/by/${id}`);
  }

  getLessorByCode(lessorCode: any): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/api/v1/lessor/find/by/lessor/code/${lessorCode}`);
  }

  addLessor(data: any): Observable<any> {
    const lessorsUrl = `${environment.BASE_URL}/api/v1/lessor/add`;
    return this.http.post<any>(lessorsUrl, data);
  }

  updateLessor(lessorDetails: any): Observable<any> {
    const updateBillUrl = `${environment.BASE_URL}/api/v1/lessor/update`;

    return this.http.put<any>(updateBillUrl, lessorDetails)
  }

  deleteLessorTemporarily(id: any): Observable<any> {
    const lessorsUrl = `${environment.BASE_URL}/api/v1/lessor/temporary/delete/${id}`;
    return this.http.put<any>(lessorsUrl, id);
  }
  deleteLessorPemanently(id: any): Observable<any> {
    const lessorsUrl = `${environment.BASE_URL}/api/v1/lessor/permanent/delete/${id}`;
    return this.http.delete<any>(lessorsUrl, id);
  }


  // ********************************************************************************************************************


  getLeasses(): Observable<any> {
    const lessorsUrl = `${environment.BASE_URL}/api/v1/lease/find/all`;

    return this.http.get<any>(lessorsUrl);
  }

  // getLessorById(params: any): Observable<any> {
  //   return this.http.get(`${environment.BASE_URL}/api/v1/po/billed/order`, {
  //     params,
  //   });
  // }

  getLeasseById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/api/v1/lease/find/by/id/${id}`);
  }

  // getLeasseByCode(lessorCode: any): Observable<any> {
  //   return this.http.get<any>(`${environment.BASE_URL}/api/v1/lessor/find/by/lessor/code/${lessorCode}`);
  // }

  addLeasse(data: any): Observable<any> {
    const payBillUrl = `${environment.BASE_URL}/api/v1/lease/add/lease`;

    return this.http.post<any>(payBillUrl, data);
  }

  updateLeasse(lessorDetails): Observable<any> {
    const updateBillUrl = `${environment.BASE_URL}/api/v1/lease/update/by/id/${lessorDetails.id}`;

    return this.http.put<any>(updateBillUrl, lessorDetails)
  }

  deleteLeasse(id: any): Observable<any> {
    const deleteTransactionUrl = `${environment.BASE_URL}/api/v1/transaction/delete/temporary/${id}`;
    return this.http.put<any>(deleteTransactionUrl, id);
  }

  getROUArmotizationById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/api/v1/lease/rou/armotization/schedule/${id}`);
  }
  getLeaseArmotizationById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/api/v1/lease/lease/armotization/schedule/${id}`);
  }

  // ********************************************************************************************************************



}
