import { Directive } from "@angular/core";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { Store } from "@ngrx/store";
import { addPatientToFavoriteList, removePatientFromFavoriteList } from "../../../core/favorite-list-store/favorite-list.actions";
import { ColDef } from "../../models/col-def.model";
import { Patient } from "../../models/patient.model";
import { DateService } from "../../services/date.service";

@Directive()
export abstract class PatientsBase {
  colDefs: ColDef<Patient>[] = [
    {
      titleKey: 'stms.grid.code',
      propName: 'code',
      width: '20%',
      position: 'center',
    },
    {
      titleKey: 'stms.grid.full-name',
      propName: 'fullName',
      width: '20%',
      position: 'center',
    },
    {
      titleKey: 'stms.grid.sex',
      propName: '',
      valueFormatter: (value: Patient) => {
        return value.sex.name;
      },
      width: '20%',
      position: 'center',
    },
    {
      titleKey: 'stms.grid.age',
      propName: '',
      valueFormatter: (value: Patient) => {
        return this.dateService.getAgeFromDate(value.birthDate.dateTime);
      },
      width: '20%',
      position: 'center',
    },
    {
      titleKey: 'stms.grid.favorite',
      propName: '',
      width: '20%',
      position: 'center',
      cellRenderer: {
        component: MatCheckbox,
        inputs: {
          checked: (value: Patient) => this.isPatientSelected(value.code)
        },
        outputs: {
          change: (event, patient) => this.addToFavorite(event, patient)
        }
      }
    },
  ];

  protected selectedPatients: Patient[] = [];

  constructor(
    protected readonly dateService: DateService,
    protected readonly store: Store) { }

  private isPatientSelected(code: number): boolean {
    if (!this.selectedPatients) {
      return true;
    }

    return this.selectedPatients.some(patient => patient.code === code);
  }

  private addToFavorite({ checked }: MatCheckboxChange, patient: Patient): void {
    if (!checked) {
      this.store.dispatch(removePatientFromFavoriteList({ patient }));

      return;
    }

    this.store.dispatch(addPatientToFavoriteList({ patient }));
  }
}
