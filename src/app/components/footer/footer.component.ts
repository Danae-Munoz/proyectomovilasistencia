import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline, schoolOutline, gridOutline } from 'ionicons/icons';
import { ScannerService } from 'src/app/services/scanner.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent {
  
  selectedButton = 'home';
  @Output() footerClick = new EventEmitter<string>();
  admin_: boolean = false;
  componente_actual = 'qrwebscanner';

  constructor(private auth: AuthService, private scanner: ScannerService, private bd: DatabaseService) { 
    addIcons({homeOutline,schoolOutline,gridOutline,pencilOutline,qrCodeOutline,pawOutline});
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }

  ngOnInit() {
    this.auth.leerUsuarioAutenticado().then((userData) => {
      this.admin_ = userData?.userName === 'admin';
    });
    this.componente_actual = '';
    this.bd.datosQR.next('');
    
  }

}
