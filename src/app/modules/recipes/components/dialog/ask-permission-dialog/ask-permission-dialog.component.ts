import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {take} from "rxjs";

@Component({
  selector: 'app-ask-permission-dialog',
  templateUrl: './ask-permission-dialog.component.html',
  styleUrls: ['./ask-permission-dialog.component.scss']
})
export class AskPermissionDialogComponent {

  id: number = 0;

  constructor(private userService: UserService,
              private toaster: ToastrService,
              public dialogRef: MatDialogRef<AskPermissionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){
    this.id = data.id;
    console.log(this.id)
  }

  onClickAskPermission() {
    this.userService.askPermission(this.id)
      .pipe(take(1))
      .subscribe(() => {
        this.toaster.success("Request completed successfully!", "Success");
    });
    this.dialogRef.close();
  }
}
