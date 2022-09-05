import { Action, createReducer, on } from '@ngrx/store';
import { Patient } from '../../../shared/models/patient.model';
import { loadPatients, loadPatientsFailure, loadPatientsSuccess } from './patients.actions';

export interface PatientsState {
  patients: Patient[];
  loading: boolean;
  error: unknown | null;
}

export const initialFilesState: PatientsState = {
  patients: [],
  loading: false,
  error: null,
};

const patientsReducer = createReducer(
  initialFilesState,
  on(loadPatients, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadPatientsSuccess, (state, { patients }) => ({
    ...state,
    patients,
    loading: false,
  })),
  on(loadPatientsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);

export function PatientsReducer(
  state: PatientsState | undefined,
  action: Action,
): PatientsState {
  return patientsReducer(state, action);
}
