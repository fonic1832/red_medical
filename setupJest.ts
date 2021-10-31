import "jest-preset-angular/setup-jest";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import localeEn from "@angular/common/locales/en";

registerLocaleData(localeDe, "de");
registerLocaleData(localeEn, "en");
