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
  rolLocal?:string;
  datos: any[] = [];

  usuario$: Observable<any[]> | undefined;

  esAdmin: boolean = true;
  estaIniciado: boolean = false;

  constructor(
    private autenticacionS: AutenticacionService,
    private router: Router,
    private firebaseS: FirebaseService
  ){}

  ngOnInit() {    

    this.estaIniciado = this.autenticacionS.estaLogeado;

    //no funciona meterlo en el servicio, no da los mismos resultados
    this.firebaseS.usuarioPorId(String(localStorage.getItem('idUsuario'))).subscribe(data => {

    this.esAdmin = data[0].rol === 'Administrador'; // Verifica si el rol es "Administrador"
    console.log('Es admin:', this.esAdmin);

    //controlamos si es admin o no para enviar a una ruta o a otra
    var v = true;
    if (this.estaIniciado && this.esAdmin==false && v==true) {
      console.log('galeria', this.esAdmin);
      // Si el usuario ya ha iniciado sesión, redirige al usuario a la ruta '/galeria'
      this.router.navigate(['/galeria']);
      v=false;
    }
    else if (this.estaIniciado && this.esAdmin==true && v==true) {
      console.log('add', this.esAdmin);
      this.router.navigate(['/administracion']);
      v=false;
    }

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
/*
  estaLog() {console.log(this.autenticacionS.estaLogeado);}

  esAD() 
  {
    console.log('autenticación:',this.autenticacionS.esAdmin);
    console.log('ROL ad:',localStorage.getItem('rolUsuario'));
    console.log('ID:',localStorage.getItem('idUsuario'));
    console.log("bool admin:",this.esAdmin)
  }  
  */
}
