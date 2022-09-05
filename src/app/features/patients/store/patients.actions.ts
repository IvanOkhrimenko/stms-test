import { createAction, props } from '@ngrx/store';
import { Patient } from '../../../shared/models/patient.model';

function scoped(templateString: TemplateStringsArray) {
  return `[Patients] ${templateString[0]}`;
}

export const loadPatients = createAction(
  scoped`Load Patients`,
);

export const loadPatientsSuccess = createAction(
  scoped`Load Patients Succes`,
  props<{ patients: Patient[] }>(),
);

export const loadPatientsFailure = createAction(
  scoped`Load Patients Failure`,
  props<{ error: unknown }>(),
);