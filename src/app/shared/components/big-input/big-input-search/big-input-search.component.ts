import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'st-big-input-search',
  templateUrl: './big-input-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigInputSearchComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() faIcon = '';

  @Output() onSearchEvent = new EventEmitter<string>();

  private searchQuery = '';

  onClick(): void {
    this.onSearchEvent.emit(this.searchQuery);
  }

  onInputChange(value: string): void {
    this.searchQuery = value;
  }
}
