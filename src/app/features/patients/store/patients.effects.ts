import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientsService } from '../services/patients.service';
import { loadPatients, loadPatientsFailure, loadPatientsSuccess } from './patients.actions';

@Injectable()
export class PatientsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly patientsService: PatientsService,
  ) { }

  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPatients),
      switchMap(() =>
        this.patientsService.getPatients().pipe(
          map((patients) => loadPatientsSuccess({ patients })),
          catchError((error: unknown) => of(loadPatientsFailure({ error }))),
        ),
      ),
    ),
  );
}
