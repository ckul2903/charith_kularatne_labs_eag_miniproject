import config from '../config/conf.js';
import { CognitoUserPool , CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId : config.userPoolId,
  ClientId : config.clientId,
};

const userPool = new CognitoUserPool(poolData);

export default userPool;