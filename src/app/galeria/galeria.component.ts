import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from '@angular/fire/storage';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  images: string[] = [];

  constructor(private storage: Storage) {}

  ngOnInit(): void {
    this.getImages();
  }

  subirArchivo($event: any) {
    const file = $event.target.files[0];
    const usuarioId = localStorage.getItem('idUsuario');
    const imgRef = ref(this.storage, `${usuarioId}/${file.name}`);

    uploadBytes(imgRef, file).then(x => {
      this.getImages();
    }).catch(error => console.log(error));
  } 

  getImages() {
    const usuarioId = localStorage.getItem('idUsuario');
    const imagesRef = ref(this.storage, `${usuarioId}`);

    listAll(imagesRef).then(async images => {
    this.images = [];
    for(let image of images.items) {
      const url = await getDownloadURL(image);
      this.images.push(url);
    }

    }).catch(error => console.log(error));
  };

  eliminarArchivo(ruta:string){
    if(confirm("¿Seguro que quieres eliminar esta imagen?")){

        const referencia = ref(this.storage, ruta);

        deleteObject(referencia).then(() => {          
          alert("Imagen borrada correctamente")
          window.location.reload();
        }).catch((error) => {
          alert("ERROR la Imagen no se ha borrada")
        });

    }

  }

}