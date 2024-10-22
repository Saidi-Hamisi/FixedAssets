import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { CustodiansComponent } from 'src/app/admin/custodians/pages/custodians/custodians.component';
import { DepartmentService } from 'src/app/admin/data/services/department.service';
import { Department } from 'src/app/admin/data/types/department';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.sass']
})
export class DeleteDepartmentComponent extends BaseComponent implements OnInit {
  department: Department;
  departmentId: number;

  constructor(  public dialogRef: MatDialogRef<CustodiansComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService, private departmentsService: DepartmentService) {
      super();
     }

  ngOnInit(): void {
    this.department = this.data.department;

    this.departmentId = this.data.department.id;
  }

  confirmDelete(){
    this.departmentsService.deleteDepartment(this.departmentId).pipe(takeUntil(this.subject)).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", res.message);
      this.dialogRef.close();
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
