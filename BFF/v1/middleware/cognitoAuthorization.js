import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';
import BffError from '../exceptions/BffError.js';

let jwks;

const getJwks = async () => {
    logger.info("Getting JWKS | checking uri");
    if(!jwks){
        const response = await axios.get(`https://cognito-idp.${config.awsRegion}.amazonaws.com/${config.userPoolId}/.well-known/jwks.json`)
        jwks = response.data.keys;
    }

    if (jwks != undefined) {
        return jwks;
    }
    throw new BffError("Error getting JWKS");
}

const authorize = (role) => {
    return async (req, res, next) => {
        try {
            logger.info("Cognito authorization | Authorizing action for",role);
            const token = req.headers.authorization.split(" ")[1];

            const jwks = await getJwks();
            const decodedToken = jwt.decode(token, {complete:true});
            const kid = decodedToken.header.kid;
            const key = jwks.find(k => k.kid === kid);
            const pem = jwkToPem(key);

            logger.info("Cognito authorization | Got tokens");
            jwt.verify(token, pem, {algorithms: ['RS256']}, (err,decoded) => {
                if(err){
                    logger.error(err);
                    return res.status(401).json({message : "Unauthorized"});
                }
                logger.info("Cognito authorization | decoding user");
                console.log(decoded);
                
                if(decoded['cognito:groups']){
                    if(decoded['cognito:groups'].includes(role)){
                        logger.info("Cognito authorization | authorization successful");
                        next();
                    } else {
                        logger.error("Unauthorized user");
                        return res.status(401).json({message:"Forbidden"});
                    }
                }
                return res.status(500).json({message:"Error in authorization"});
            })
        } catch (error) {
            
        }
    }  
};

export default authorize;