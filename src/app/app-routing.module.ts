import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegistroComponent } from './auth/registro/registro.component';
import { InicioSesionComponent } from './auth/inicio-sesion/inicio-sesion.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { EditarUsuarioComponent } from './administracion/editar-usuario/editar-usuario.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { iniciadoGuard } from './guards/iniciado.guard';
import { Error404Component } from './error404/error404.component';
import { administradorGuard } from './guards/administrador.guard';

const routes: Routes = [
  // Ruta por defecto que redirige al componente 'BienvenidaComponent' cuando la URL es vacía
  { path: '', pathMatch: 'full', redirectTo: '/auth/inicioSesion' },

  { 
    path: 'auth/registro',
    component: RegistroComponent,
  },
  { 
    path: 'auth/inicioSesion', 
    component: InicioSesionComponent,
  },

  {
    path: 'administracion',
    component: AdministracionComponent,
    canActivate: [iniciadoGuard ,administradorGuard]
  },

  {
    path: 'administracion',
    children:
    [
      {
        path: 'editarUsuario/:id',
        component: EditarUsuarioComponent,
      },
      {
        path: 'crearUsuario',
        component: RegistroComponent,
      },
    ],
    canActivate: [iniciadoGuard,administradorGuard]
  },

  {
    path: 'galeria',
    component: GaleriaComponent,
    canActivate: [iniciadoGuard]
  },

  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }