import { NgModule } from "@angular/core";
import { NgbButtonsModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const declaration = [
    NgbButtonsModule,
    NgbDropdownModule
]

@NgModule({
    imports: [
        ...declaration
    ],
    exports: [...declaration]
})

export class NgBootstrapModule { }