import {Component, NgZone} from '@angular/core';
import {CredentialResponse, PromptMomentNotification} from "google-one-tap";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-google-form',
  templateUrl: './google-form.component.html',
  styleUrls: ['./google-form.component.scss']
})
export class GoogleFormComponent {
  constructor(
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: '',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    // await this.service.LoginWithGoogle(response.credential).subscribe(
    //   (x:any) => {
    //     localStorage.setItem("token", x.token);
    //     this._ngZone.run(() => {
    //       this.router.navigate(['/welcome']);
    //     })},
    //   (error:any) => {
    //     console.log(error);
    //   }
    // );
  }
}
