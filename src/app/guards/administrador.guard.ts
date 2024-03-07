import { inject } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { CanActivateFn,Router } from '@angular/router';
import { FirebaseService } from '../servicios/firebase.service';

export const administradorGuard: CanActivateFn = (route, state) => {

  const authS = inject(AutenticacionService);
  const firebaseS = inject(FirebaseService);
  const router = inject(Router);
  
  firebaseS.usuarioPorId(String(localStorage.getItem('idUsuario'))).subscribe(data => {
    return data[0].rol === 'Administrador';//true o false
  });

  return false
  
};
