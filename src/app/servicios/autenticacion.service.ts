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
    const id = String(localStorage.getItem('idUsuario'));
    const rol = String(this.firebaseS.obtenerRolPorId(id));
    console.log("rolll:",this.firebaseS.obtenerRolPorId(id))
    if(rol=="Administrador")
    return true;
    else
    return false;
  }

}
