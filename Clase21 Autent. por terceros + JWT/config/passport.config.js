import githubStrategy from "passport-github2";
import passport from "passport";
import userService from "../models/Users.js";

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.findById(id);
    done(null, user);
  });
};

export default initializePassport;

//Usando la estrategia de Github quedaria asi:

const initializePassportGithub = () => {
  passport.use('github', new githubStrategy({
    clientId: '...',
    clientSecret: '...',
    callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
  }, async(accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile) //Muy recomendado hacer console.log de toda la informacion que viene del perfil.
      let user = await userService.findOne({email: profile._json.email})
      
      if (!user) {//Si el user no existia en nuestro sitio web lo agregamos a la base de datos
        let newUser = {
          first_name: profile._json.name,
          last_name: '',//Nota como nos toca rellenar los datos que no vienen desde el perfil
          age: 18,
          email: profile._json.email,
          password: ''//Al ser autenticacion por terceros no podemos asignar un password
        }
        let result = await userService.create(newUser)
        done(null, result)
      } else {//Si entrara aqui es pq el user ya existia
        done(null, user)
      }
    } catch (error) {
      return done(error)
    }
  }))
};

export defualt initializePassportGithub;
