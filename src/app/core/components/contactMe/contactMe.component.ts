import { Component } from '@angular/core';

@Component({
    selector: 'contact-me',
    templateUrl: './contactMe.view.html'
})

export class ContactMeComponent {
    public contact: any = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };
}
