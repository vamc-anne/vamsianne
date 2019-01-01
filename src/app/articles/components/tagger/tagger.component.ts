import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  templateUrl: "./tagger.view.html",
  selector: "tagger",
  styleUrls: ["./tagger.style.scss"]
})
export class TaggerComponent {
  public tag: string = "";
  @Input("stack") tags;
  @Output() add = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  
  public makeTag = () => {
    if (this.tag.trim().length) {
      this.add.emit(this.tag);
      this.resetTag();
    }
  };

  private resetTag = () => {
    this.tag = "";
  };

  public removeTag = index => {
    this.remove.emit(index);
  };
}
