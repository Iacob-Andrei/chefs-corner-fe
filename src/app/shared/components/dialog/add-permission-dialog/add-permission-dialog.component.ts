import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {FiltersService} from "@app-shared/components/top-bar/services/filters.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {UserService} from "../../../../modules/recipes/services/user.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-add-permission-dialog',
  templateUrl: './add-permission-dialog.component.html',
  styleUrls: ['./add-permission-dialog.component.scss']
})
export class AddPermissionDialogComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = [];
  stateCtrl = new FormControl('');
  filteredEmails!: Observable<string[]>;
  currentPermissions!: string[];

  constructor(private filterService: FiltersService,
              private authService: AuthService,
              private userService: UserService,
              public toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddPermissionDialogComponent>) {}

  ngOnInit() {
    this.subscriptions.push(
      this.userService.getCurrentPermission(this.data.idRecipe).subscribe(
        (result) => {
          this.currentPermissions = result;
        }
      )
    );
  }

  filterOnEnter(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.stateCtrl.value) {
      this.filteredEmails = this.filterService.getEmailsByFilter(this.stateCtrl.value).pipe(
        map(emails => {
          return emails.filter((email:any) => email !== this.authService.getSubjectFromToken() && !this.currentPermissions.includes(email));
        })
      );
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.subscriptions.push(
      this.userService.addPermission(this.data.idRecipe, event.option.value).subscribe(
        () => {
          this.dialogRef.close();
          this.showWarningSuccess("User granted permission.", "Success");
        }
      )
    );
  }

  onClickRemovePermission(email: string) {

    this.subscriptions.push(
      this.userService.removePermission(this.data.idRecipe, email).subscribe(
        () => {
          this.currentPermissions = this.currentPermissions.filter(item => item !== email);
          this.showWarningSuccess("Permission removed.","Success")
        }
      )
    )
  }

  showWarningSuccess(title: string, message: string): void{
    this.toaster.success(message, title);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

