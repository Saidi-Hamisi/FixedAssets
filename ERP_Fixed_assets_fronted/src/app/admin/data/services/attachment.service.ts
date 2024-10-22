import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Attachment } from "../types/attachment";

@Injectable({
  providedIn: "root",
})
export class AttachmentService {
  constructor(private http: HttpClient) {}

  addAttachment(attachment): Observable<{ message: string }> {
    const addAttachmentUrl = `${environment.BASE_URL}api/assets/file/upload`;

    return this.http.post<{ message: string }>(addAttachmentUrl, attachment);
  }

  getAttachments(): Observable<Attachment[]> {
    const attachmentsUrl = `${environment.BASE_URL}api/assets/files`;

    return this.http.get<Attachment[]>(attachmentsUrl);
  }
}
