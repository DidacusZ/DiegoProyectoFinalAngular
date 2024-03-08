import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { FirebaseService } from '../servicios/firebase.service';

export const administradorGuard: CanActivateFn = (route, state) => {

  const firebaseS = inject(FirebaseService);
  const router = inject(Router);
  
  firebaseS.usuarioPorId(String(localStorage.getItem('idUsuario'))).subscribe(data => {
  if(!(data[0].rol === 'Administrador'))
    router.navigateByUrl('/galeria');  
  });
  return true
};
