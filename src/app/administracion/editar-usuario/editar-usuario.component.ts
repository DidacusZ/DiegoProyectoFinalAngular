import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';
import { Usuario } from '../../modelos/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  editarUsuarioForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    //email: ['', [Validators.required, Validators.email]],
    movil: ['', Validators.required],
    //clave: ['', Validators.required],
    rol: ['', Validators.required]
  });
  usuario: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private firebaseS: FirebaseService
  ) {
    
   }

  ngOnInit(): void {
    // Obtener el ID del usuario de los parámetros de la URL
    const userId = this.route.snapshot.params['id'];
    // Obtener los datos del usuario utilizando el servicio Firebase
    this.firebaseS.getDocumentById(userId).subscribe((data: Usuario | undefined) => {
      if (data !== undefined) {
        this.usuario = data;
        // Llenar el formulario con los datos del usuario
        this.editarUsuarioForm = this.fb.group({
          nombre: [data.nombre, Validators.required],
          //email: [data.email, [Validators.required, Validators.email]],
          movil:[data.movil, Validators.required],
          //clave: [data.clave, Validators.required],
          rol: [data.rol, Validators.required] // Puedes utilizar un select para elegir el rol
        });
        
      } else {
        console.error('No se encontraron datos del usuario');
      }
    });
  }

  onSubmit() {
    if(this.editarUsuarioForm){
      if (this.editarUsuarioForm.valid && this.usuario) {
        const newData: Usuario = this.editarUsuarioForm.value;
        // Actualizar los datos del usuario utilizando el servicio Firebase
        if(this.usuario.id){
          this.firebaseS.editarUsuario(this.usuario.id, newData)
          .then(() => {
            console.log('Usuario actualizado exitosamente');
            // Redirigir a la página de administración después de editar
            this.router.navigate(['/administracion']);
          })
          .catch((error) => {
            console.error('Error al actualizar usuario:', error);
          });
        }        
      }
    }
  }


}