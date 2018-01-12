import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {AuthService} from '../services/auth.service';
import {IToken} from '../model/itoken.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;

  title = 'Sign In';
  form: FormGroup;

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  /**
   * Diagnostic message from received
   * form request error
   */
  errorDiagnostic: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private jwtHelper: JwtHelperService) {
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.form.value.username, this.form.value.password)
      .subscribe(
        (token: IToken) => {
          localStorage.setItem('token', token.token);
           this.authService.getLoggedInName.emit(this.jwtHelper.decodeToken(token.token).sub);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.submitted = false;
          this.title = 'Sign In';
          this.errorDiagnostic = 'Incorrect username or password.';
          this.alertService.error(error);
        });
  }
}
