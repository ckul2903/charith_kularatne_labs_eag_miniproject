import {CognitoUser , AuthenticationDetails , CognitoUserAttribute} from 'amazon-cognito-identity-js';
import userPool from '../connectors/cognitoUserPoolConnector.js';
import logger from '../config/logger.js';
import BffError from '../exceptions/BffError.js';

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
                throw new BffError("Authentication failed",500);
            }
        })
    } catch (error) {
        logger.error("Auth service | Exception : {}", error.cause);
        throw error;
    }
  };

  async registerUser(username,password,role){
    try {
      const attributeList = [];
  
      const attributeUsername = new CognitoUserAttribute({Name:'preferred_username', Value:username});
      // const attributeUserGroup = new CognitoUserAttribute({Name:'custom:group', Value:role});
    
      attributeList.push(attributeUsername);
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          console.log(err);
          throw new BffError("Registration failed", 500);
        }
        const cognitoUser = result.user;
        logger.info('user name is ' + cognitoUser.getUsername());
        return cognitoUser;
      });
    } catch (error) {
      logger.error("Auth service | Exception : "+ error);
      throw error;
    }
  }
}

export default AuthService;