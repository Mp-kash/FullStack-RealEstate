import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

// load .env for the server (import.meta.env is a Vite/browser helper and isn't
// available in Node — using it here causes a crash). Use process.env instead.
dotenv.config();

const domain = process.env.AUTH0_DOMAIN || process.env.VITE_AUTH0_DOMAIN;
const issuerBaseURL = domain ? `https://${domain}` : undefined;

if (!issuerBaseURL) {
  throw new Error(
    "Auth0 issuer base URL is not set. Define AUTH0_DOMAIN or AUTH0_ISSUER_BASE_URL in your server environment."
  );
}

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE || "http://localhost:8000/",
  issuerBaseURL,
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
