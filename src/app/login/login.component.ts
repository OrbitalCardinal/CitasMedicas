import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    selector: "login-component",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss", "./login-1366.component.scss", "./login-1920.component.scss"]
})



export class LoginComponent { 
    constructor(private router: Router) {}
    hide: Boolean = true;
    loginForm = new FormGroup({
        employeeIdFormControl:  new FormControl("", [Validators.required,]),
        passwordFormControl: new FormControl("", Validators.required)
    });

    onSubmit() {
        console.warn(this.loginForm.value);
        this.router.navigate(["main"]);
    }
    
}