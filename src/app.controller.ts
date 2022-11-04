import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as admin from 'firebase-admin';
const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    let data: string = '';
    await admin
      .firestore()
      .collection('dog')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          data += doc.id;
        });
      });
    return data;
    // return this.appService.getHello();
  }
}
