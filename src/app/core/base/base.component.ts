import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {

  protected endSubsctiptions$: Subject<boolean> = new Subject<boolean>();

  public ngOnDestroy(): void {
    this.endSubsctiptions$.next(true);
    this.endSubsctiptions$.complete();
  }
}