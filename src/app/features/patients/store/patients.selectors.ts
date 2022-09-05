import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsState } from './patients.reducer';

export const PATIENT_FEATURE_NAME = 'patientState';

const selectPatientState =
  createFeatureSelector<PatientsState>(PATIENT_FEATURE_NAME);

export const selectPatients = createSelector(
  selectPatientState,
  (state) => state.patients,
);
export const selectIsLoading = createSelector(
  selectPatientState,
  (state) => state.loading,
);

export const selectPatientsViewModel = createSelector(
  selectPatients,
  selectIsLoading,
  (patients, isLoading) => ({
    patients,
    isLoading,
  }),
);
