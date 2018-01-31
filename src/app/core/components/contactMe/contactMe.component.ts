import { Component } from '@angular/core';

@Component({
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
