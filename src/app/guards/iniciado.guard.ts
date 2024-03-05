import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

export const iniciadoGuard: CanActivateFn = () => {

  const authService = inject(AutenticacionService);
  const router = inject(Router);

  //authService.estaLogeado || router.navigateByUrl('/auth/inicioSesion');//redireccion si no esta iniciado

/*
  if (authService.estaLogeado) {
    // Si el usuario está logueado, redirigir a la ruta deseada
    router.navigateByUrl('/bienvenida');
    return false; // No permitir el acceso a la ruta actual
  }
  */
  return true; // Permitir el acceso a la ruta actual si el usuario no está logueado

};
