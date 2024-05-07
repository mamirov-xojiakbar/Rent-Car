import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { Client } from 'src/client/entities/client.entity';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailClient(client: Client) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/client/activate/${client.activation_link}`;
    log(url);
    await this.mailerService.sendMail({
      to: client.email,
      subject: 'Welcome to Rent-Car App! Confirmation your email',
      template: './confirmation',
      context: {
        name: client.full_name,
        url,
      },
    });
  }

  // async sendMailAdmin(admin: Admin) {
  //   const url = `${process.env.API_HOST}:${process.env.PORT}/api/admin/activate/${admin.activation_link}`;
  //   log(url);
  //   await this.mailerService.sendMail({
  //     to: admin.email,
  //     subject: 'Welcome to Hospital App! Confirmation your email',
  //     template: './confirmation',
  //     context: {
  //       name: admin.name,
  //       url,
  //     },
  //   });
  // }

  // async sendMailDoctor(doctor: Doctor) {
  //   const url = `${process.env.API_HOST}:${process.env.PORT}/api/doctor/activate/${doctor.activation_link}`;
  //   log(url);
  //   await this.mailerService.sendMail({
  //     to: doctor.email,
  //     subject: 'Welcome to Hospital App! Confirmation your email',
  //     template: './confirmation',
  //     context: {
  //       name: doctor.full_name,
  //       url,
  //     },
  //   });
  // }
}
