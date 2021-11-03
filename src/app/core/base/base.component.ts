import { Component, OnDestroy } from "@angular/core";
import { textmodules } from "../../i18n/textmodules";
import { Subject } from "rxjs";

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {

  protected endSubsctiptions$: Subject<boolean> = new Subject<boolean>();

  public textmodules: typeof textmodules = textmodules;

  public ngOnDestroy(): void {
    this.endSubsctiptions$.next(true);
    this.endSubsctiptions$.complete();
  }
}
