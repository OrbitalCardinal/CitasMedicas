import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    selector: "login-component",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss", "./login-1366.component.scss", "./login-1920.component.scss"]
})



export class LoginComponent { 
    constructor(private router: Router, private http: HttpClient) {}
    hide: Boolean = true;
    loginForm = new FormGroup({
        employeeIdFormControl:  new FormControl("", [Validators.required,]),
        passwordFormControl: new FormControl("", Validators.required)
    });

    async onSubmit() {
        const employeeId = this.loginForm.value['employeeIdFormControl'];
        const passProvided = this.loginForm.value['passwordFormControl'];
        console.log(employeeId);
        const url = "http://localhost:3000/empleados?id=" + employeeId;
        console.log("URL = " + url );
        const response =  await this.http.get<{message: String, data: any}>(url).toPromise();
        const data = response.data
        const pass = data.contraseña;
        
        if(pass == passProvided) {
            this.router.navigate(["main"]);
        } else {
            window.alert("Contraseña incorrecta");
        }
    }
    
}