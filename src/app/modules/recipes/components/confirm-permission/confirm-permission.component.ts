import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../services/user.service";
import {HOME} from "@app-shared/constants";

@Component({
  selector: 'app-confirm-permission',
  templateUrl: './confirm-permission.component.html',
  styleUrls: ['./confirm-permission.component.scss']
})
export class ConfirmPermissionComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  token!: string;
  requestData!: Observable<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private userService: UserService){}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        if(params['token']){
          this.token = params['token'];
          this.requestData = this.userService.getDataPermissionRequest(this.token);
        }else{
          this.toaster.error("No token present!", "Error");
        }
      })
    );
  }

  onClickGoDenyRequest() {
    this.subscriptions.push(
      this.userService.deletePermissionRequest(this.token).subscribe(() => {
        this.toaster.success("Permission request denied successfully!", "Success");
        this.router.navigateByUrl(HOME).then();
      })
    );
  }

  onClickAcceptRequest() {
    this.subscriptions.push(
      this.userService.confirmPermission(this.token).subscribe(() => {
        this.toaster.success("Permission granted successfully!", "Success");
        this.router.navigateByUrl(HOME).then();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
