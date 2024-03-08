import { Component, OnInit } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  formLogin: FormGroup;//formulario reactivo
  esAdmin: boolean = true;
  estaIniciado: boolean = false;

  constructor(
    private autenticacionS: AutenticacionService,
    private router: Router,
    private firebaseS: FirebaseService
  ) 
  {

    this.formLogin = new FormGroup
    ({
      email: new FormControl(),
      password: new FormControl()
    })

  }

  ngOnInit(): void {
  }

  inicioSesionForm() {
    console.log(this.formLogin);
    this.autenticacionS.inicioSesion(this.formLogin.value)
      .then(response => {
        console.log(response);        
        window.location.reload();
      })
      .catch(error => //console.log(error)
      alert("Email o contraseña incorrectos")
      );
  }
}
