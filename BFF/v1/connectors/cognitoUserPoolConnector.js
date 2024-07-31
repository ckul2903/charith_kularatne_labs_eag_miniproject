import { CognitoUserPool , CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId : "us-east-1_kJOXfmVU8",
  ClientId : "5lsus7bqi4iah41t84jf2ms9su"
};

const userPool = new CognitoUserPool(poolData);

export default userPool;