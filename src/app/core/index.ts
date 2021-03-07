import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";

export const declarations = [
    HeaderComponent,
    FooterComponent,
    DropdownComponent
]

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]