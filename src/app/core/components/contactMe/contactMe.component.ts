import { Component } from '@angular/core';
import { ContactsService } from "../../services/contacts.service";
import { error, debug } from 'util';
import { NotifierService } from '../../../utility/services/notifier.service';

@Component({
    selector: 'contact-me',
    templateUrl: './contactMe.view.html'
})

export class ContactMeComponent {

    constructor(private contactsService: ContactsService, private notifierSrvc: NotifierService) { }
    public contact: any = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };

    public submitContactInfo = () => {
        this.notifierSrvc.showLoader();
        this.contactsService.submitContactInfo(this.contact).then((resp) => {
            this.notifierSrvc.hideLoader();
            const successMessage = 'Contact info submitted sucessfully. Kindly play few games in the games tab while I contact you'
            this.notifierSrvc.showToaster({message: successMessage, type:'success'});            
        }).catch((err) => {
            this.notifierSrvc.hideLoader();
            this.notifierSrvc.showToaster({message: err.message, type:'danger'});
            throw err;
        })
    };
}
