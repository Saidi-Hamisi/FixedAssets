import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentUnit } from 'src/app/admin/data/types/department-unit';
import { DepartmentUnitsComponent } from '../department-units/department-units.component';

@Component({
  selector: 'app-department-unit',
  templateUrl: './department-unit.component.html',
  styleUrls: ['./department-unit.component.sass']
})
export class DepartmentUnitComponent implements OnInit {
  departmentUnit: DepartmentUnit;
  departmentUnitId: number;

  constructor(public dialogRef: MatDialogRef<DepartmentUnitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.departmentUnit = this.data.departmentUnit;

    console.log(this.departmentUnit);
  }

}
