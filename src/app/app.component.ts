import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver
} from "@angular/core";
import { PopupComponent } from "./utility/components/popup/popup.component";
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd
} from "@angular/router";
import "../assets/style.css";
import { LoginController } from "./core/components/login/login.controller";
import { NotifierService } from "./utility/services/notifier.service";
import { LoginService } from "./login/login.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.view.html",
  styleUrls: ["./app.styles.scss"]
})
export class AppComponent implements OnInit {
  public showLoader: boolean = false;
  constructor(
    private notifierService: NotifierService,
    private loginService: LoginService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  ngOnInit() {
    const config = {
      apiKey: "AIzaSyAHW4MK0xRA9BwZNKpHLyK5B4ySyNVh2Pk",
      authDomain: "vamsianne-91b98.firebaseapp.com",
      databaseURL: "https://vamsianne-91b98.firebaseio.com",
      projectId: "vamsianne-91b98",
      storageBucket: "vamsianne-91b98.appspot.com",
      messagingSenderId: "633972291649"
    };

    this.loginService.init(config);
    this.notifierService.isLoading().subscribe(loader => {
      this.showLoader = loader;
    });

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.showLoader = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.showLoader = false;
      }
    });
  }
}
