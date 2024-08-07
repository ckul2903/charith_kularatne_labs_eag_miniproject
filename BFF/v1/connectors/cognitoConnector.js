import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import conf from '../config/conf.js';

const cognitoClient = new CognitoIdentityProviderClient(
  {
    region:'us-east-1',
    credentials:{
      accessKeyId: conf.awsAccessKey,
      secretAccessKey: conf.awsSecretKey,
      sessionToken: conf.awsSessionToken
    }
  }
);

const poolData = {
  UserPoolId : conf.userPoolId,
  ClientId : conf.clientId,
};

const userPool = new CognitoUserPool(poolData);


export {cognitoClient, userPool};