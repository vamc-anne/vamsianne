import {
  ViewChild,
  ViewContainerRef,
  ViewRef,
  Component,
  ComponentFactoryResolver,
  OnInit
} from "@angular/core";
import { ChangeDetectorRef } from "@angular/core/src/change_detection/change_detector_ref";
import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { ToasterComponent } from "../toaster/toaster.component";
import { NotifierService } from "../../services/notifier.service";
import { viewClassName } from "@angular/compiler";
@Component({
  selector: "popup",
  templateUrl: "./popup.view.html",
  styleUrls: ["./popup.styles.scss"]
})
export class PopupComponent implements OnInit {
  public config = {
    modalClass: "modalClose",
    size: "",
    canClose: true,
    closeOnOutsideClick: true,
    component: ""
  };
  @ViewChild("content", { read: ViewContainerRef })
  viewContainer: ViewContainerRef;

  constructor(
    private componentFactoryresolver: ComponentFactoryResolver,
    private obsService: NotifierService
  ) {}

  ngOnInit() {
    this.obsService.popUpSrvc().subscribe(config => {
      if (config) {
        config.component &&
          this.openPopup(Object.assign({}, this.config, config));
      }
    });
  }

  public openPopup = ({ component, data, modalClass }) => {
    let componentFactory = this.componentFactoryresolver.resolveComponentFactory(
      component
    );
    this.viewContainer.clear();
    let componentRef = this.viewContainer.createComponent(componentFactory);
    componentRef.instance["handlers"] = { close: this.closePopup };
    componentRef.instance["data"] = data;
    if (modalClass === "modalClose") {
      this.config.modalClass = "modalBck";
    }
  };

  public closePopup = () => {
    this.viewContainer.clear();
    this.config.modalClass = "modalClose";
  };
}
