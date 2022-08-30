import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/models';
import { FirestoreService } from '../../services/firestore.service';
import { FirestorageService } from '../../services/firestorage.service';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.page.html',
  styleUrls: ['./list-empleados.page.scss'],
})
export class ListEmpleadosPage implements OnInit {

  private path = 'Productos/';
  productos: Producto[] = [];

  newProducto: Producto;

  enableNewProducto = false;

 


  newImage = '';
  newFile: any;

  loading: any;

  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService) { }

  ngOnInit() {
      this.getProductos();
  }

  openMenu() {
      console.log('open menu');
      this.menucontroler.toggle('principal');
  }

  async guardarProducto() {
      this.presentLoading();
      const path = 'Productos';
      const name = this.newProducto.nombre;
      if (this.newFile !== undefined) {
        const res = await this.firestorageService.uploadImage(this.newFile, path, name);
        this.newProducto.foto = res;
      }
      this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id).then( res => {
           this.loading.dismiss();
           this.presentToast('guardo con exito');
      }).catch( error => {
         this.presentToast('no se pude guardar');
      });
  }

  getProductos() {
    this.firestoreService.getCollection<Producto>(this.path).subscribe(  res => {
           this.productos = res;
    });
  }

  async deleteProducto(producto: Producto) {

      const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Advertencia',
        message: ' Seguro desea <strong>eliminar</strong> este producto',
        buttons: [
          {
            text: 'cancelar',
            role: 'cancel',
            cssClass: 'normal',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
              // this.alertController.dismiss();
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Okay');
              this.firestoreService.deleteDoc(this.path, producto.id).then( res => {
                this.presentToast('eliminado con exito');
                this.alertController.dismiss();
              }).catch( error => {
                  this.presentToast('no se pude eliminar');
              });
            }
          }
        ]
      });
      await alert.present();
  }

  nuevo() {
    this.enableNewProducto = true;
    this.newProducto = {
      nombre: '',
      precioNormal: null,
      precioReducido: null,
      foto: 'htt',
      id: this.firestoreService.getId(),
      fecha: new Date()
    };
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }


  async newImageUpload(event: any) {
      if (event.target.files && event.target.files[0]) {
          this.newFile = event.target.files[0];
          const reader = new FileReader();
          reader.onload = ((image) => {
              this.newProducto.foto = image.target.result as string;
          });
          reader.readAsDataURL(event.target.files[0]);
        }
  }

 

}
