import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../servicios/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  
  usuarios$: Observable<any[]> | undefined;

  constructor(
    private router: Router,
    private firebaseS: FirebaseService) { }

  ngOnInit(): void {
    // Llama a la función del servicio para obtener la lista de usuarios
    this.usuarios$ = this.firebaseS.getUsers();
  }

  editarUsuario(id:string) {
    // Implementa la lógica para editar un usuario (por ejemplo, navegación a una página de edición)
    console.log('Edit user:',id);
    this.router.navigate(['/administracion/editarUsuario',id]);

  }

  eliminarUsuario(userId: string) 
  {
    // Llama a la función del servicio para eliminar el usuario
    if(confirm("¿Seguro que quieres eliminar este usuario?"))
    {
      this.firebaseS.deleteUser(userId)
      .then(() => alert('Usuario eliminado correctamente'))
      .catch(error => alert('Error al eliminar el usuario'));
    }
  }


    
}