import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "st-big-input",
  templateUrl: "./big-input.component.html",
  styleUrls: ["./big-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigInputComponent {
  @Input()
  placeholder: string;

  @Input()
  value = "";
  @Input()
  disabled = false;

  @Output() onInputChange = new EventEmitter<string>();

  hasFocus = false;

  onChange(value: string): void {
    this.onInputChange.emit(value);
  }
}
