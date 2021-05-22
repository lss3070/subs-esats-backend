import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/commonconstants';
import { MailModuleOptions } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';
import { EmailVar } from '../../dist/mail/mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}
  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    form.append('from', `To SongSeop  <postmaster@${this.options.domain}>`);
    form.append('to', `songseop.tech@gmail.com`);
    form.append('template', template);
    form.append('subject', subject);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    try {
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
    } catch (e) {
      console.log(e);
    }
  }
  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify your email', 'verify-email', [
      { key: code, value: code },
      { key: 'username', value: email },
    ]);
  }
}
