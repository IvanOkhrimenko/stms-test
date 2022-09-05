import { CellRenderer } from "./col-renderer.model";

export interface ColDef<T> {
    titleKey?: string,
    propName?: string,
    width?: string,
    position?: string,
    valueFormatter?(param: T): string,
    cellRenderer?: CellRenderer,
}
