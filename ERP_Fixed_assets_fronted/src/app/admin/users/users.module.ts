import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./pages/users/users.component";
import { UserComponent } from "./pages/user/user.component";
import { AddUserComponent } from "./pages/add-user/add-user.component";
import { UpdateUserComponent } from "./pages/update-user/update-user.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LockedAccountsComponent } from "./pages/locked-accounts/locked-accounts.component";
import { DeletedAccountsComponent } from "./pages/deleted-accounts/deleted-accounts.component";
import { InactiveAccountsComponent } from "./pages/inactive-accounts/inactive-accounts.component";
import { DeleteUserComponent } from "./pages/delete-user/delete-user.component";
import { RestoreAccountComponent } from "./pages/restore-account/restore-account.component";
import { ActivateUserComponent } from "./pages/activate-user/activate-user.component";
import { CdkColumnDef } from "@angular/cdk/table";
import { DashboardModule } from "../dashboard/dashboard.module";
import { UserLogsComponent } from "./pages/user-logs/user-logs.component";

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent,
    LockedAccountsComponent,
    DeletedAccountsComponent,
    InactiveAccountsComponent,
    DeleteUserComponent,
    RestoreAccountComponent,
    ActivateUserComponent,
    UserLogsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    DashboardModule,
    MatFormFieldModule,
  ],
  providers: [CdkColumnDef, DatePipe],
})
export class UsersModule {}
