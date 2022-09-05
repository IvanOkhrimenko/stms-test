import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../../core/core.module";
import { ColDef } from "../../../models/col-def.model";

@Component({
  selector: "st-grid",
  templateUrl: "./grid.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent<T> {
  @Input() colDefs: ColDef<T>[] = [];
  @Input() rowData: T[] = [];

  readonly routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
}
