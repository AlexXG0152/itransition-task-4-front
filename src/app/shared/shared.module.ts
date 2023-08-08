import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from './services/error.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [TooltipComponent, TooltipDirective],
  imports: [CommonModule],
  exports: [ErrorService, AuthInterceptor, TooltipDirective],
})
export class SharedModule {}
