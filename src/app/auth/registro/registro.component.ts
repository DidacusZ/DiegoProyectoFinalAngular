import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {//implements OnInit {

  datos:Usuario={    
    id: '',
    nombre: '',
    movil: '',
    email: '',
    clave: '',
    rol: 'Usuario'
  }

  constructor(
    private autenticacionS: AutenticacionService,
    private router: Router,
    private firebaseS: FirebaseService
  ) {}

  async registrar(){
    console.log("datos -> ",this.datos)
    const respuesta =await this.autenticacionS.registrarUsuario(this.datos).catch(error => {console.log(error);})
    if(respuesta){
      
      const coleccion = "Usuarios";
      const id = respuesta.user?.uid;
      this.datos.id=id;
      this.datos.clave="";//para que solo este guarda en la autenticación
      await this.firebaseS.crearDocumento(this.datos,coleccion).catch(error => alert("Ha habido un error al guardar los datos del usuario en la base de datos"));      
      this.router.navigate(['/auth/inicioSesion']);
      alert("Usuario registrado correctamente");
    }
  }
}