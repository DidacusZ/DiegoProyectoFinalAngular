import { Component } from '@angular/core';
import { FirebaseService } from '../servicios/firebase.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {

  constructor(
    //private router: Router,
    private firebaseS: FirebaseService
  ) {}

}
