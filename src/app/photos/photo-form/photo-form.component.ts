import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { race } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(private builder: FormBuilder, private photoService: PhotoService, private router: Router) { }

  ngOnInit() {
   this.photoForm = this.builder.group({
     file: ['', Validators.required],
     description: ['', Validators.maxLength(300)],
     allowComments: [true]
   })
  }

  upload(){
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments');
    this.photoService.upload(description, allowComments, this.file)
    .subscribe(() => this.router.navigate(['']));
  }

  handleFile(file: File){
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
