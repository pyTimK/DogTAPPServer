import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('')
  async getHello(
    @Query('altitude') altitude: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('year') year: number,
    @Query('month') month: number,
    @Query('day') day: number,
    @Query('hour') hour: number,
    @Query('minute') minute: number,
    @Query('second') second: number,
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
    return altitude;
    // return this.appService.getHello();
  }
}
