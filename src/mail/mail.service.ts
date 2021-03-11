import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/commonconstants';
import { MailModuleOptions } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}
  private async sendEmail(subject: string, content: string, to: string) {
    const form = new FormData();
    form.append('from', `Mailgun Sandbox <postmaster@${this.options.domain}>`);
    form.append('to', `songseop.tech@gmail.com`);
    form.append('text', content);
    form.append('subject', subject);
    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        method: 'POST',
        body: form,
      },
    );
    console.log("!!");
    console.log(response.body);
  }
}
