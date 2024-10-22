import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { AttachmentService } from "src/app/admin/data/services/attachment.service";
import { Attachment } from "src/app/admin/data/types/attachment";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AddAttachmentComponent } from "../add-attachment/add-attachment.component";
import { DeleteAttachmentComponent } from "../delete-attachment/delete-attachment.component";
import { UpdateAttachmentComponent } from "../update-attachment/update-attachment.component";

export interface PeriodicElement {
  name: string;
  url: string;
  dateAdded: string;
}


@Component({
  selector: "app-attachments",
  templateUrl: "./attachments.component.html",
  styleUrls: ["./attachments.component.sass"],
})
export class AttachmentsComponent extends BaseComponent implements OnInit {
  attachments: Attachment [] = [];
  

  displayedColumns: string[] = ["name", "url", "dateAdded", "actions"];

  dataSource: MatTableDataSource<Attachment>;
  isLoading = true;
  selection = new SelectionModel<Attachment>(true, []);
  index: number;
  id: number;
  
 
  // dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource3.filter = filterValue.trim().toLowerCase();
  // }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    private dialog: MatDialog,
    private attachmentService: AttachmentService
  ) {
    super();
  }

  ngOnInit(): void {
   
    this.getAttachments();
  }

  refresh() {
    this.getAttachments();
  }

  getAttachments() {
    this.attachmentService
      .getAttachments()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.attachments = res;

          console.log(this.attachments)

          if(this.attachments){
            this.isLoading = false
          }
          
          this.dataSource = new MatTableDataSource<Attachment>(this.attachments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
         
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addAtachmentCall() {
    this.dialog.open(AddAttachmentComponent, {
      data: {
        user: "",
        action: "add",
      },
      width: "500px",
    });
  }

  editAttachmentCall() {
    this.dialog.open(UpdateAttachmentComponent, {
      data: {
        user: "",
        action: "add",
      },
      width: "500px",
    });
  }

  deleteAttachmentCall() {
    this.dialog.open(DeleteAttachmentComponent, {
      data: {
        user: "",
        action: "add",
      },
      width: "500px",
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Attachment) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
