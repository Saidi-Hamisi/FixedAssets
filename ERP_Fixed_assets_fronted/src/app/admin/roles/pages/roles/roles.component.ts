import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { RoleService } from 'src/app/admin/data/services/role.service';
import { Role } from 'src/app/admin/data/types/role';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass']
})
export class RolesComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'edit',
    'delete',
  ];

  roles: Role[] = [];
  dataSource!: MatTableDataSource<Role>;
  isLoading: boolean = true;


  constructor(private rolesService: RoleService) {
    super();
   }

   @ViewChild(MatPaginator)
   paginator!: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;
   @ViewChild("filter", { static: true }) filter: ElementRef;
   @ViewChild(MatMenuTrigger)
   contextMenu: MatMenuTrigger;
   contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.rolesService
      .getAllRoles()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.isLoading = false
          this.roles = res;
          this.dataSource = new MatTableDataSource<Role>(this.roles);
          this.dataSource.paginator = this.paginator;
          console.log(this.roles);
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
