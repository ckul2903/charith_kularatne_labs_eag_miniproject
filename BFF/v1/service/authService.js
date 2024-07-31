import {CognitoUser , AuthenticationDetails , CognitoUserAttribute} from 'amazon-cognito-identity-js';
import userPool from '../connectors/cognitoUserPoolConnector.js';
import logger from '../config/logger.js';

class AuthService {
  async authenticateUser(username, password){  
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
  
    const userData = {
      Username: username,
      Pool: userPool,
    };
  
    const cognitoUser = new CognitoUser(userData);
  
    try {
        return cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
              return result;
            },
            onFailure: (err) => {
                throw new Error;
            }
        })
    } catch (error) {
        logger.error("Auth service | Exception : {}", error.cause);
    }
  };

  async registerUser(username,password){
    const attributeList = [];
  
    const attributeUsername = new CognitoUserAttribute({Name:'preferred_username', Value:username});
  
    attributeList.push(attributeUsername);
  
    try {
        userPool.signUp(username, password, attributeList, null, (err, result) => {
            if (err) {
                console.log(err);
                throw new Error;
            }
            const cognitoUser = result.user;
            logger.info('user name is ' + cognitoUser.getUsername());
            return cognitoUser;
        });
    } catch (error) {
        logger.error("Auth service | Exception : {}", error.cause);
    }
  }
}

export default AuthService;