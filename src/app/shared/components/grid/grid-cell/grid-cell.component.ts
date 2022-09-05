import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { ColDef } from "../../../models/col-def.model";
import { CellRenderer } from "../../../models/col-renderer.model";

@Component({
  selector: "st-grid-cell",
  templateUrl: "./grid-cell.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridCellComponent<T> implements AfterViewInit {
  @ViewChild('dynamicComp', { read: ViewContainerRef }) dynamicComp: ViewContainerRef;

  @Input() colDef: ColDef<T>;
  @Input() row: T;

  private subscriptions = new Subscription();

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.setDynamicComponents();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get value(): string {
    const value = this.colDef.valueFormatter ? this.colDef.valueFormatter(this.row) : this.row[this.colDef.propName];
    return !!value ? value : 'Unknown';
  }

  private setDynamicComponents(): void {
    if (!this.dynamicComp || this.dynamicComp.length) {
      return;
    }

    if (!this.colDef.cellRenderer) {
      return;
    }
    this.createComponent(this.colDef.cellRenderer);
  }


  private createComponent(cellRenderer: CellRenderer) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cellRenderer.component);
    const component = this.dynamicComp.createComponent(componentFactory);

    this.setInputParameters(component, cellRenderer);
    this.subscribeToOutputEvents(component, cellRenderer);

    this.cd.detectChanges();
  }

  private setInputParameters(component: ComponentRef<unknown>, cellRenderer: CellRenderer): void {
    Object.keys(cellRenderer.inputs).forEach(key => {
      if (this.isFunction(cellRenderer.inputs[key])) {
        component.instance[key] = cellRenderer.inputs[key](this.row);
      } else {
        component.instance[key] = cellRenderer.inputs[key];
      }
    })
  }

  private subscribeToOutputEvents(component: ComponentRef<unknown>, cellRenderer: CellRenderer): void {
    Object.keys(cellRenderer.outputs).forEach(key => {
      const subscription = component.instance[key]?.subscribe(event => {
        if (this.isFunction(cellRenderer.outputs[key])) {
          cellRenderer.outputs[key](event, this.row);
        }
      })

      this.subscriptions.add(subscription);
    });
  }

  private isFunction(func: (...args: any[]) => void): boolean {
    return func && {}.toString.call(func) === '[object Function]';
  }
}
