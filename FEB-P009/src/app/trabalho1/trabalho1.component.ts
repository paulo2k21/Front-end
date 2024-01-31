import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-trabalho1',
    templateUrl: './trabalho1.component.html',
    styleUrls: ['./trabalho1.component.css']
})
export class Trabalho1Component {
    constructor(private sanitizer: DomSanitizer) {}

    getImageUrl(imageUrl: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
    }

    iniciarAnimacao() {
        console.log('Iniciando animação...');
    }
}
