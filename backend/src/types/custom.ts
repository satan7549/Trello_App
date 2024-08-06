declare module "passport-google-oauth20" {
  import { Strategy as PassportStrategy } from "passport";
  import { Request } from "express";

  interface Profile {
    id: string;
    displayName: string;
    name?: {
      familyName: string;
      givenName: string;
    };
    emails: { value: string; verified: boolean }[];
    photos?: { value: string }[];
  }

  interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    passReqToCallback?: boolean;
  }

  interface VerifyCallback {
    (error: any, user?: any, info?: any): void;
  }

  type VerifyFunctionWithRequest = (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => void;

  type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => void;

  class Strategy extends PassportStrategy {
    constructor(
      options: StrategyOptions,
      verify: VerifyFunction | VerifyFunctionWithRequest
    );
  }
}
