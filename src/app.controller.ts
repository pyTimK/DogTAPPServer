import { Controller, Get, Param } from '@nestjs/common';
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

  @Get(
    '/:altitude/:latitude/:longitude/:year/:month/:day/:hour/:minute/:second',
  )
  async getHello(
    @Param('altitude') altitude: number,
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number,
    @Param('year') year: number,
    @Param('month') month: number,
    @Param('day') day: number,
    @Param('hour') hour: number,
    @Param('minute') minute: number,
    @Param('second') second: number,
  ) {
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
    console.log(
      altitude,
      latitude,
      longitude,
      year,
      month,
      day,
      hour,
      minute,
      second,
    );
    return data;
    // return this.appService.getHello();
  }
}
