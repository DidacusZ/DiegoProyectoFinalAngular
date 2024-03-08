import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, docData, query, where } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable, first, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  crearDocumento(datos: any, coleccion: string){
    const collectionRef = collection(this.firestore, coleccion);
    return addDoc(collectionRef, datos) as Promise<any>;
  }
  
  getDocumentById(id: string){
    const documentRef = doc(this.firestore, 'Usuarios' + "/" + id);
    return docData(documentRef, {idField: "id"}) as Observable<any>;
  }

  getUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'Usuarios');
    const usersQuery = query(usersCollection);
    return collectionData(usersQuery, { idField: 'id' });
  }

  deleteUser(userId: string): Promise<void> {
    const userDoc = doc(this.firestore, 'Usuarios', userId);
    return deleteDoc(userDoc);
  }

  editarUsuario(userId: string, newData: any): Promise<void> 
  {
    const userDoc = doc(this.firestore, 'Usuarios', userId);
     return updateDoc(userDoc, newData);
  }

  usuarioPorId(valor: string){
    const collectionRef = collection(this.firestore, 'Usuarios');
    const queryRef = query(collectionRef, where('id', "==", valor));
    return collectionData(queryRef, {idField: "id"}) as Observable<any[]>;
  }
  
}
