import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { CategoryService } from "src/app/admin/data/services/category.service";
import { Category } from "src/app/admin/data/types/category";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { CategoryComponent } from "../category/category.component";
import { DeleteCategoryComponent } from "../delete-category/delete-category.component";
import { UpdateCategoryComponent } from "../update-category/update-category.component";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.sass"],
})
export class CategoriesComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "code",
    "name",
    "depreciation_type",
    "depreciation_rate",
    "actions",
  ];

  categories: Category[] = [];
  dataSource: MatTableDataSource<Category>;
  isLoading = true;
  selection = new SelectionModel<Category>(true, []);
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  refresh() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.categories = res;

          if (this.categories) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<Category>(this.categories);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addCategoryCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    (dialogConfig.autoFocus = true), (dialogConfig.width = "500px");
    dialogConfig.data = {
      test: "",
    };
    this.dialog.open(AddCategoryComponent, dialogConfig);
  }

  editCall(category) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      category,
    };
    this.dialog.open(UpdateCategoryComponent, dialogConfig);
  }

  deleteCategoryCall(category) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      category,
    };
    this.dialog.open(DeleteCategoryComponent, dialogConfig);
  }

  categoryDetailsCall(category){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    (dialogConfig.autoFocus = true), (dialogConfig.width = "500px");
    dialogConfig.data = {
      category: category,
    };
    this.dialog.open(CategoryComponent, dialogConfig);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Category) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
