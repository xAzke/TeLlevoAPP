import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faCoffee,
    faUser,
    faHome,
    faRightToBracket,
    faLock,
    faWallet,
    faPhone,
    faMagnifyingGlass,
    faMap
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [FontAwesomeModule],
    exports: [FontAwesomeModule],
})
export class IconsModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faCoffee, faUser, faHome, faRightToBracket, faLock, faWallet, faPhone, faMagnifyingGlass, faMap);
    }
}
