import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../core.config";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactsService {
    constructor(private http: HttpClient){}
    public submitContactInfo(contactInfo:any){
        return this.http.post(`${BASE_URL}/core/addContact`, contactInfo).toPromise();
    } 
}