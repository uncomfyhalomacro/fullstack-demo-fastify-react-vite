import { loadEnvFile } from "node:process";
import { sign, verify } from "@node-rs/jsonwebtoken";

loadEnvFile();

const SECRET = process.env.JWT_SECRET || "secret";
const ISSUER = process.env.JWT_ISSUER || "";
const AUD = process.env.JWT_AUD || "";
const getUtcTimestamp = () => Math.floor(Date.now() / 1000);
const oneDayInSeconds = 86400;

const generateJwt = async ({ user_id, role, email, username }) => {
	const iat = getUtcTimestamp();
	const payload = {
		id: user_id,
		username: username,
		email: email,
		role: role,
		iss: ISSUER,
		audience: AUD,
	};
	const exp = iat + oneDayInSeconds;
	const claims = {
		data: payload,
		exp: exp,
	};
	const headers = { algorithm: "HS384" };
	const token = await sign(claims, SECRET, headers);
	return token;
};

const verifyJwt = async ({ token }) => {
	const validation = { algorithms: ["HS384"] }; // Default already validates expiry
	const decodedToken = await verify(token, SECRET, validation);
	if (decodedToken === undefined || decodedToken === null) {
		throw new Error("invalid jwt token");
	}
	const { data } = decodedToken;
	if (data.audience !== AUD) {
		throw new Error("audience does not match");
	}
	if (data.iss !== ISSUER) {
		throw new Error("iss does not match");
	}
	return data;
};

export { verifyJwt, generateJwt };
