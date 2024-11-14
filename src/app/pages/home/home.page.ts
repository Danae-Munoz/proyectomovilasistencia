import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { DinosaurComponent } from 'src/app/components/dinosaur/dinosaur.component';
import { AuthService } from 'src/app/services/auth.service';
import { IonContent } from '@ionic/angular/standalone'
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { Dinosaur } from 'src/app/model/dinosaur';
import { Capacitor } from '@capacitor/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { ForumComponent } from 'src/app/components/forum/forum.component';
import { MiClaseComponent } from "../../components/miclase/miclase.component";
import { MisDatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { User } from 'src/app/model/user';
import { Usuario } from 'src/app/model/usuario';
import { Asistencia } from 'src/app/model/asistencia';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports:[
    CommonModule, FormsModule, TranslateModule, IonContent,
    HeaderComponent, FooterComponent,
    WelcomeComponent, QrWebScannerComponent, DinosaurComponent,
    ForumComponent, MiClaseComponent, MisDatosComponent, WelcomeComponent  
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

// MisdatosComponent
export class HomePage {
  
  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'home';
  user: User = new User();

  constructor(private auth: AuthService, private scanner: ScannerService) { 
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  ionViewWillEnter() {
    this.changeComponent('qrwebscanner');
  }

  async headerClick(button: string) {

    if (button === 'testqr')
      this.showDinoComponent(Asistencia.jsonAsisExample);

    if (button === 'scan' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'qrwebscanner';

    if (button === 'scan' && Capacitor.getPlatform() !== 'web')
        this.showDinoComponent(await this.scanner.scan());
  }

  webQrScanned(qr: string) {
    this.showDinoComponent(qr);
  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  showDinoComponent(qr: string) {

    if (Asistencia.isValidAsistenciaQrCode(qr)) {
      console.log(qr)
      this.auth.qrCodeData.next(qr);
      this.changeComponent('dinosaur');
      return;
    }
    
    this.changeComponent('welcome');
  }

  footerClick(button: string) {
    console.log('Footer clicked:', button);
    this.selectedComponent = button;
  }

  changeComponent(name: string) {
    this.selectedComponent = name;    
    this.footer.selectedButton = name;    
  }
  

}
