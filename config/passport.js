import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import * as db from "../database/queries.js";

passport.use(new LocalStrategy(async (username, password, done) =>{
    try {
        const user = await db.getUserByUsername(username);
        if(!user){
            return done(null, false, { message: "Incorrect Username "});
        }
        
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return done(null, false, { message: "Incorrect Password "});
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, async(jwtPayload, done)=> {
        try {
            const user = await db.getUserById(jwtPayload.id);

            if(!user){
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);