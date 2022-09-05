import { ChangeDetectionStrategy, Component } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { setFilterQuery } from "../../../../core/favorite-list-store/favorite-list.actions";
import { selectActiveList } from "../../../../core/favorite-list-store/favorite-list.selectors";

@Component({
  selector: "st-favorite-list-main",
  templateUrl: "./favorite-list-main.component.html",
  styleUrls: ["./favorite-list-main.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteListComponent {

  activeList$ = this.store.select(selectActiveList);

  readonly faSearchIcon = faSearch;

  constructor(private readonly store: Store) { }

  onSearch(filterQuery: string): void {
    this.store.dispatch(setFilterQuery({ filterQuery }));
  }
}
