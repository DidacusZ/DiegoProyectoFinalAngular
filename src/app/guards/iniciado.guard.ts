import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

export const iniciadoGuard: CanActivateFn = () => {

  const authService = inject(AutenticacionService);
  const router = inject(Router);

  authService.estaLogeado || router.navigateByUrl('/auth/inicioSesion');//redireccion si no esta iniciado

  return true;
};
