import { User, Article } from "#root/db/models";

import passwordCompareSync from "#root/helpers/passwordCompareSync";

import accessEnv from "#root/helpers/accessEnv";

const JWT_SECRET = accessEnv("JWT_SECRET", "jwtsecret");
