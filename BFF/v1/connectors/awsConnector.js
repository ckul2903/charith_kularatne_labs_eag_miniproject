import { config, Credentials } from 'aws-sdk';
import conf from '../config/conf.js';

config.update({
  region: 'us-east-1',
  credentials: new Credentials(conf.awsAccessKey, conf.awsSecretKey),
});
