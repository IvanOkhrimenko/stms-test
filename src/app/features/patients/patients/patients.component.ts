import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { selectFavoritePatients } from "../../../core/favorite-list-store/favorite-list.selectors";
import { PatientsBase } from "../../../shared/common/patients/patients-base";
import { DateService } from "../../../shared/services/date.service";
import { loadPatients } from "../store/patients.actions";
import { selectPatientsViewModel } from "../store/patients.selectors";

@Component({
  selector: "st-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent extends PatientsBase {
  readonly patientsViewModel$ = this.store.select(selectPatientsViewModel);

  private readonly selectedPatients$ = this.store.select(selectFavoritePatients);
  private readonly unsubscribe$ = new Subject<boolean>();

  constructor(
    protected readonly dateService: DateService,
    protected readonly store: Store
  ) {
    super(dateService, store);
  }

  ngOnInit(): void {
    this.selectPatients();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getPatients(): void {
    this.store.dispatch(loadPatients())
  }

  private selectPatients(): void {
    this.selectedPatients$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(selectedPatients => {
      this.selectedPatients = selectedPatients;
    })
  }
}
