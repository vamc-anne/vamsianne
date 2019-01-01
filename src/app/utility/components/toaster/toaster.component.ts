import { Component, OnInit } from "@angular/core";
import { NotifierService } from "../../services/notifier.service";
import { toasterSrvc_default } from "../../utility.config";

@Component({
  selector: "toaster",
  templateUrl: "./toaster.view.html",
  styleUrls: ["./toaster.scss"]
})
export class ToasterComponent implements OnInit {
  public toast: any = toasterSrvc_default;
  public showToaster: boolean = false;
  constructor(private notifierService: NotifierService) {}
  ngOnInit() {
    this.notifierService.toasterSrvc().subscribe(config => {
      if (config.show) {
        this.toast = Object.assign(toasterSrvc_default, config);
        this.showToaster = true;
        this.toast.closeIn &&
          setTimeout(() => {
            this.showToaster = false;
          }, this.toast.closeIn);
      }
    });
  }

  public closeToaster = () => {
    this.showToaster = false;
  };

  public getColorByType = (type: string) => {
    switch (type) {
      case "success":
        return "green";
      case "info":
        return "blue";
      case "danger":
        return "red";
      case "warning":
        return "orange";
      default:
        return "gray";
    }
  };
}
