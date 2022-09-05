import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { selectFavoriteFilteredPatients } from "../../../../core/favorite-list-store/favorite-list.selectors";
import { PatientsBase } from "../../../../shared/common/patients/patients-base";
import { DateService } from "../../../../shared/services/date.service";

@Component({
  selector: "st-patients-list",
  templateUrl: "./patients-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsListComponent extends PatientsBase {
  readonly patients$ = this.store.select(selectFavoriteFilteredPatients).pipe(tap(console.log));
  protected selectedPatients = null;

  constructor(
    protected readonly dateService: DateService,
    protected readonly store: Store) {
    super(dateService, store);
  }
}
