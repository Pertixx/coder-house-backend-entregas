// npm install connect-mongo

import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";

// Conectamos session con lo que sera nuestro FileStore
const fileStorage = FileStore(session);

const app = express();
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "url de tu mongo atlas",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "a89asa8s48449846f",
    resave: false,
    saveUninitialized: false,
  })
);
