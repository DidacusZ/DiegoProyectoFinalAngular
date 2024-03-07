import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegistroComponent } from './auth/registro/registro.component';
import { InicioSesionComponent } from './auth/inicio-sesion/inicio-sesion.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { HomeComponent } from './home/home.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { EditarUsuarioComponent } from './administracion/editar-usuario/editar-usuario.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { iniciadoGuard } from './guards/iniciado.guard';

const routes: Routes = [
  // Ruta por defecto que redirige al componente 'BienvenidaComponent' cuando la URL es vacía
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  
  // Ruta para la página de bienvenida, muestra el componente 'BienvenidaComponent'
  // También se aplica un guardia de ruta para redirigir a '/auth/registro' si el usuario no está autorizado
  {
    path: 'bienvenida',
    component: BienvenidaComponent,
    //...canActivate(() => redirectUnauthorizedTo(['/auth/inicioSesion']))
  },

  
      // Ruta para el componente de registro
  { path: 'auth/registro', component: RegistroComponent/*, canActivate: [iniciadoGuard]*/},
      // Ruta para el componente de inicio de sesión
  { path: 'auth/inicioSesion', component: InicioSesionComponent/*, canActivate: [iniciadoGuard]*/},


  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'administracion',
    component: AdministracionComponent, 
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
    ]
  },

  {
    path: 'galeria',
    component: GaleriaComponent, 
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }