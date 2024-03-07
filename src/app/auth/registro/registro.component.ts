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
export class RegistroComponent implements OnInit {

  datos:Usuario={    
    id: '',
    nombre: '',
    movil: '',
    email: '',
    clave: '',
    rol: 'Usuario'
  }

  clave2:string='';

  estaIniciado: boolean = false;
  esAdmin: boolean = false;

  constructor(
    private autenticacionS: AutenticacionService,
    private router: Router,
    private firebaseS: FirebaseService
  ) {}

  ngOnInit(): void {
    this.estaIniciado=this.autenticacionS.estaLogeado

    this.firebaseS.usuarioPorId(String(localStorage.getItem('idUsuario'))).subscribe(data => {
    this.esAdmin = data[0].rol === 'Administrador'; // Verifica si el rol es "Administrador"
    console.log('Es admin:', this.esAdmin);
    });
  }

  async registrar(){
    console.log("datos -> ",this.datos)
    const respuesta =await this.autenticacionS.registrarUsuario(this.datos).catch(error => {console.log(error);})
    if(respuesta){      
      const coleccion = "Usuarios";
      const id = respuesta.user?.uid;
      this.datos.id=id;
      this.datos.clave="";//para que solo este guarda en la autenticación
      await this.firebaseS.crearDocumento(this.datos,coleccion).catch(error => alert("Ha habido un error al guardar los datos del usuario en la base de datos"));
      if(this.esAdmin)
      this.router.navigate(['/administracion']);
      else
      this.router.navigate(['/auth/inicioSesion']);

      alert("Usuario registrado correctamente");
    }
  }

  
  revisarContraseña() {
    /*
    const clave = (document.getElementById('clave') as HTMLInputElement).value;
    const clave2 = (document.getElementById('clave2') as HTMLInputElement).value;
    const mensajeClave = document.getElementById('mensajeClave');

    if(mensajeClave){
      if (clave === "" && clave2 === "") {
        mensajeClave.innerHTML = '<div class="alert alert-danger" role="alert">La contraseña no puede estar vacía</div>';
        (document.getElementById("boton") as HTMLButtonElement).disabled = true;
        (document.getElementById("boton") as HTMLButtonElement).style.backgroundColor = "#959595";
      } else if (clave === clave2) {
        mensajeClave.innerHTML = '<div class="alert alert-success" role="alert">Contraseña correcta</div>';
        (document.getElementById("boton") as HTMLButtonElement).disabled = false;
        (document.getElementById("boton") as HTMLButtonElement).style.backgroundColor = "#007bff";
      } else {
        mensajeClave.innerHTML = '<div class="alert alert-danger" role="alert">Las contraseñas no coinciden</div>';
        (document.getElementById("boton") as HTMLButtonElement).disabled = true;
        (document.getElementById("boton") as HTMLButtonElement).style.backgroundColor = "#959595";
      }
    }
    */
  }


}