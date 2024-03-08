import { Injectable } from '@angular/core';
import { Auth,GoogleAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';//autenticacion de firebase
import { Usuario } from '../modelos/usuario';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  listaUsuarios?: Usuario[];
  datos:any;

  rol: string = '';
  esAdministrador:boolean = false;

  constructor(
    private autenticacion: Auth,
    private firebaseS: FirebaseService
    //private autenticacionFire: AngularFireAuth
    ) { }

  registrarUsuario(datos:Usuario) 
  {    
    return createUserWithEmailAndPassword(this.autenticacion, datos.email, datos.clave);
    //return this.autenticacionFire.createUserWithEmailAndPassword(datos.email, datos.clave);
  }

  inicioSesion({ email, password }: any) 
  {    
    return signInWithEmailAndPassword(this.autenticacion, email, password)
    .then((userCredential) => {

      this.datos = userCredential.user;
      //const id = userCredential.user.uid;
      //const rol = this.firebaseS.obtenerRolPorId(id);

      //localStorage.setItem('idUsuario', id);
      //localStorage.setItem('rolUsuario', rol);

      localStorage.setItem('usuario', JSON.stringify(this.datos));
    })
    .catch((error) => {
      console.error('Error al iniciar sesión:', error);
    });
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('rolUsuario');
    return signOut(this.autenticacion);
    //return this.autenticacionFire.signOut();
  }

  get estaLogeado(): boolean 
  {
    const user = JSON.parse(localStorage.getItem('usuario')!);
    if(user){
      localStorage.setItem('idUsuario', user.uid);
      return true;  
    }  
    else
      return false;  
  }

  get esAdmin(): boolean {
    this.firebaseS.usuarioPorId(String(localStorage.getItem('idUsuario'))).subscribe(data => {
      //console.log('Datos obtenidos:', data);
      this.datos = data; // Asigna los datos a la variable datos para usarlos en tu componente
      this.rol = data[0].rol;
      console.log('ROL:', this.rol);
      this.esAdministrador = this.rol === 'Administrador';
      //this.esAdministrador = data[0].rol === 'Administrador';
      return this.esAdministrador;

    });
    return false;
  }


  esAdmin2(id:string): boolean {
    this.firebaseS.usuarioPorId(id).subscribe(data => {
      //console.log('Datos obtenidos:', data);
      this.datos = data; // Asigna los datos a la variable datos para usarlos en tu componente
      this.rol = data[0].rol;
      console.log('ROL:', this.rol);
      this.esAdministrador = this.rol === 'Administrador';
      return this.esAdministrador;
    });
    return false;
  }

}
