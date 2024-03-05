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

  rol?:string;
  datos: any[] = [];

  usuario$: Observable<any[]> | undefined;

  esAdmin: boolean = true;
  estaIniciado: boolean = false;
  constructor(
    private autenticacionS: AutenticacionService,
    private router: Router,
    private firebaseS: FirebaseService
  ){
  }

  ngOnInit() {
    
    //this.esAdmin = this.autenticacionS.rolUsuario;
    console.log('roluser',this.autenticacionS.esAdmin)
    this.firebaseS.usuarioPorId(String(localStorage.getItem('idUsuario'))).subscribe(data => {
      //console.log('Datos obtenidos:', data);
      this.datos = data; // Asigna los datos a la variable datos para usarlos en tu componente
      this.rol=data[0].rol;
      this.esAdmin = this.rol === 'Administrador'; // Verifica si el rol es "Administrador"
      console.log('Es admin:', this.esAdmin);

      console.log('RolLll:', data[0].rol);
    });

    this.estaIniciado = this.autenticacionS.estaLogeado;

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
    }

  esAD() 
  {
    console.log('autenticación:',this.autenticacionS.esAdmin);
    console.log('ROL:',localStorage.getItem('rolUsuario'))
    console.log('ID:',localStorage.getItem('idUsuario'))
/*
    this.firebaseS.usuarioPorId(String(localStorage.getItem('idUsuario'))).subscribe(data => {
      //console.log('Datos obtenidos:', data);
      this.datos = data; // Asigna los datos a la variable datos para usarlos en tu componente
      this.rol=data[0].rol;
      this.esAdmin = this.rol === 'Administrador'; // Verifica si el rol es "Administrador"
      console.log('Es admin:', this.esAdmin);

      console.log('RolL:', data[0].rol);
    });
*/
  }  
}
