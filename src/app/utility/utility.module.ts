import { NgModule } from "@angular/core";
import { NotifierService } from "./services/notifier.service";
import { CommonUtil } from "./services/commonUtil.service";
import { ToasterComponent } from "./components/toaster/toaster.component";
import { CommonModule } from "@angular/common";
import { PopupComponent } from "./components/popup/popup.component";

@NgModule({
  imports: [CommonModule],
  providers: [NotifierService, CommonUtil],
  declarations: [ToasterComponent, PopupComponent],
  exports: [ToasterComponent, PopupComponent, CommonModule]
})
export class UtilityModule {}
