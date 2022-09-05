import { ComponentType } from "@angular/cdk/overlay";

export interface CellRenderer {
    component?: ComponentType<any>,
    inputs?: Record<string, (...args) => void>
    outputs?: Record<string, (...args) => void>
}
