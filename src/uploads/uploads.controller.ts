import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'kimchimansongseop93';

// AKIAWFU7BTGSDDC2E464
// ez/XtZr0IzPKjUqSkhHWZkoLEvLZBkFfk9RFzDit

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: 'AKIAWFU7BTGSDDC2E464',
        secretAccessKey: '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',
      },
    });
    try {
      const objectName = uuidv4();
      const upload = await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();
      const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (error) {
      return null;
    }
  }
}
