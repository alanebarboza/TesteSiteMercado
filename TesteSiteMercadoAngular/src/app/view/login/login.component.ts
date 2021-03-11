import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/resources/usuario';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public login: Usuario;

  constructor(private loginService: LoginService, private router: Router) { 
    this.login = new Usuario();
  }

  ngOnInit(): void {
  }

  doLogin(){
    this.loginService.doLogin(this.login).subscribe((data) => {
      if(data.success){
          this.router.navigate(['/produto']);
      }else{
        alert("Usuário e/ou senha inválidos.");
      }
    },
    error =>{
      console.log(error);
    });
  }

}
