import { Module, DynamicModule } from '@nestjs/common';

import { CONFIG_OPTIONS } from '../common/commonconstants';
import { MailModuleOptions } from './mail.interfaces';
import { MailService } from './mail.service';

@Module({})
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
      exports: [MailService],
    };
  }
}
