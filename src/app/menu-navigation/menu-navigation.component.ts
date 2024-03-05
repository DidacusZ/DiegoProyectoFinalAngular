import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../servicios/firebase.service';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);

  rol:'Usuario' | 'Administrador' | undefined;

  esAdmin: boolean = true;
  estaIniciado: boolean = false;
  constructor(
    private autenticacionS: AutenticacionService,
    private router: Router,
    private firebaseS: FirebaseService
  ){
  }

  ngOnInit() {
    this.esAdmin = this.autenticacionS.esAdmin;
    this.estaIniciado = this.autenticacionS.estaLogeado;

    console.log(this.autenticacionS.esAdmin);
    console.log(this.autenticacionS.estaLogeado);


    const userId = 'l8VG01sogXNsqPdAniYMoyQHd733'; // Aquí debes proporcionar el ID del usuario
    this.firebaseS.obtenerRolPorId(userId).subscribe((rol: string) => {
      console.log('Rol del usuario:', rol);
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    cerrarSesion(){
      if(confirm("¿Seguro que quieres cerrar sesión?"))
      {
        this.autenticacionS.cerrarSesion();
        this.router.navigate(['auth/inicioSesion']);
        this.estaIniciado = this.autenticacionS.estaLogeado;
      }
    }
    estaLog() 
    {
      console.log(this.autenticacionS.estaLogeado);
      console.log(JSON.parse(localStorage.getItem('usuario')!))
    }

  esAD() 
  {
    console.log(this.autenticacionS.esAdmin);
    console.log('ROL:',localStorage.getItem('rolUsuario'))
    console.log('ID:',localStorage.getItem('idUsuario'))
  }  
}
