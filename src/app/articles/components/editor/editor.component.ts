import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output,
  ElementRef,
  ViewChild
} from "@angular/core";

declare const tinymce: any;
interface WebpackRequire extends NodeRequire {
  ensure: (paths: string[], callback: (require: any) => void) => void;
}

@Component({
  selector: "text-editor",
  templateUrl: "./editor.view.html"
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  isBrowser: boolean = false;
  isEditorReady: boolean = false;
  TinyMCELoaded: boolean;
  Editor: any;
  @ViewChild("editor") textEditor: ElementRef;
  @Input() text: string;
  @Input() class: string;
  @Output() onEditorContentChange = new EventEmitter<any>();

  constructor() {
    this.isBrowser = typeof window !== "undefined";
  }

  ngAfterViewInit() {
    const webpackRequire = <WebpackRequire>require;
    if (this.isBrowser) {
      webpackRequire.ensure(["tinymce/tinymce"], require => {
        require("tinymce/tinymce");
        require("tinymce/themes/modern/theme");
        require("tinymce/plugins/preview");
        tinymce.init({
          target: this.textEditor.nativeElement,
          skin_url: "/assets/tinymce/skins/lightgray",
          plugins: "preview", // Skins is in the wwwroot˜
          setup: editor => {
            this.Editor = editor;
            this.isEditorReady = true;
            editor.on("keyup change undo redo", () => {
              const content = editor.getContent();
              const rawTxt = editor.getContent({format: 'text'}); 
              this.onEditorContentChange.emit({content, rawTxt});
            });
          }
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      tinymce.remove(this.Editor);
    }
  }
}
