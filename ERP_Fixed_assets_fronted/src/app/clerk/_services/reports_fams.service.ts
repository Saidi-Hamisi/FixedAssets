import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ReportFamService {
  constructor(private http: HttpClient) {}

  generateFixedAssetRegisterReport(): Observable<HttpResponse<ArrayBuffer>> {
    const createAssetUrl = `${environment.baseGetUrl}/report/fixed-asset-register`;

    return this.http.get(createAssetUrl, {
      responseType: "arraybuffer",
      observe: "response",
    });
  }

  generateDepreciationReport(params: any): Observable<ArrayBuffer> {
    const generateDepreciationReportUrl = `${environment.baseGetUrl}/report/asset-depreciation-report`;
  
    return this.http.get(generateDepreciationReportUrl, {
      params,
      responseType: 'arraybuffer'
    });
  }
  

  generateMaintenanceReport(params: any): Observable<ArrayBuffer> {
    const generateMaintenanceReportUrl = `${environment.baseGetUrl}/report/maintenance-report`;
  
    return this.http.get(generateMaintenanceReportUrl, {
      params,
      responseType: 'arraybuffer'
    });
  }
  
  generateInsuranceReport(params: any): Observable<ArrayBuffer> {
    const generateMaintenanceReportUrl = `${environment.baseGetUrl}/report/insurance-report`;
  
    return this.http.get(generateMaintenanceReportUrl, {
      params,
      responseType: 'arraybuffer'
    });
  }

  generateWarrantyReport(params: any): Observable<ArrayBuffer> {
    const generateMaintenanceReportUrl = `${environment.baseGetUrl}/report/warranty-report`;
  
    return this.http.get(generateMaintenanceReportUrl, {
      params,
      responseType: 'arraybuffer'
    });
  }
  

  generateBalanceSheet(leaseId: number, periodId: number): Observable<any> {
    const url = `${environment.baseGetUrl}/v1/reports/period/balance-sheet?leaseId=${leaseId}&periodId=${periodId}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getProfitAndLoss(leaseId: number, periodId: number) {
    const url = `${environment.baseGetUrl}/v1/reports/period/profit-and-loss?leaseId=${leaseId}&periodId=${periodId}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getAllLeaseReport(leaseType: string) {
    const url = `${environment.baseGetUrl}/v1/reports/all/lease/report?leaseType=${leaseType}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  // getAllLeaseReport(leaseStatus?: string) {
  //   const url = `${environment.baseGetUrl}/v1/reports/all/lease/report`;
  //   const params = { leaseStatus };
  //   return this.http.get(url, { params, responseType: 'arraybuffer' });
  // }


}
