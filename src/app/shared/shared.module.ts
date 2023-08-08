import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ErrorService } from './services/error.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';
// import { httpInterceptorProviders } from './interceptors/http-request.interceptor';

@NgModule({
  declarations: [UserInfoComponent, TooltipComponent, TooltipDirective],
  // providers: [httpInterceptorProviders],
  imports: [CommonModule],
  exports: [ErrorService, AuthInterceptor, TooltipDirective],
})
export class SharedModule {}
