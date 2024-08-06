import {CognitoUser , AuthenticationDetails , CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {AdminDeleteUserCommand, AdminCreateUserCommand,AdminConfirmSignUpCommand} from '@aws-sdk/client-cognito-identity-provider'
import {userPool,cognitoClient} from '../connectors/cognitoConnector.js';
import logger from '../config/logger.js';
import BffError from '../exceptions/BffError.js';
import config from '../config/conf.js';

class AuthService {
  authenticateUser(username, password){
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
  
    const userData = {
      Username: username,
      Pool: userPool,
    };
  
    const cognitoUser = new CognitoUser(userData);

    return new Promise(async (resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          logger.info("Cognito successfully authenticated user");
          resolve(result);
        },
        onFailure: (error) => {
          logger.error(error);
          reject(new BffError("Cognito authentication failed."));
        }
      });
    })
  };

  registerUser(username,password,role){
    const attributeList = [
      new CognitoUserAttribute({Name:'preferred_username', Value:username}),
      new CognitoUserAttribute({Name:'custom:group', Value:role})
    ];
      
    return new Promise(async (resolve,reject)=>{
      userPool.signUp(username,password,attributeList,null, async (err, user) => {
        if (err) {
          logger.error(err.message);
          reject(new BffError("Cognito registration failed"));
        } else {
          logger.info("Cognito registration successful");
          const params = {
            UserPoolId: config.userPoolId,
            Username: username,
          }
          await cognitoClient.send(new AdminConfirmSignUpCommand(params))
          resolve(user);
        }
      });
    });
  }

  deleteUser(username){
    return new Promise(async (resolve, reject) => {
      const params = {
        UserPoolId: config.userPoolId,
        Username: username,
      }
      try {
        const response = await cognitoClient.send(new AdminDeleteUserCommand(params));
        logger.info("Cognito successfully deleted user");
        resolve(response);
      } catch (error) {
        logger.error(error);
        reject(new BffError("Cognito delete user failed"));
      }
    })
  }
}

export default AuthService;