import jwt from "passport-jwt";
import passport from "passport";

const JWTStrategy = jwt.Strategy; //Core de la estrategia de jwt
const ExtractJWT = jwt.ExtractJwt; //Extractor de jwt ya sea de headers, cookies, etc...

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "coderSecret", //Corrobora que sea el mismo secret que en app.js
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    //Corroboramos que hay alguna cookie que tomar
    token = req.cookies["coderCookieToken"]; //Tomamos solo la cookie que necesitamos
  }
  return token;
};

export default initializePassport;
