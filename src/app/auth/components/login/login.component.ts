import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;
  form!: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [this.usernameValidator, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirmPassword: ['', Validators.minLength(1)],
    });
  }

  private readonly usernameValidator: ValidatorFn = (c) => {
    return !this.isLoginMode
      ? Validators.required(c)
      : Validators.nullValidator(c);
  };

  switchMode(loginMode: boolean): void {
    this.isLoginMode = loginMode;
    this.isFormSubmitted = false;
    this.form.reset();
  }

  submitForm(): void {
    this.isFormSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const username = this.form.value.username;
    const email = this.form.value.email;
    const password = this.form.value.password;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe((response) => {
        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;
        this.authService.saveTokens(accessToken, refreshToken);
        this.router.navigate(['/userTable']);
      });
    } else {
      const confirmPassword = this.form.value.confirmPassword;

      if (password !== confirmPassword) {
        this.router.navigate(['/login']);
        return;
      }

      this.authService
        .register(username, email, password)
        .subscribe(() =>
          this.toastr.success('Please log in to the website', 'Success!')
        );
    }
  }
}
