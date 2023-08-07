import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ErrorService } from './services/error.service';
import { httpInterceptorProviders } from './interceptors/http-request.interceptor';

@NgModule({
  declarations: [UserInfoComponent],
  providers: [httpInterceptorProviders],
  imports: [CommonModule],
  exports: [ErrorService],
})
export class SharedModule {}
