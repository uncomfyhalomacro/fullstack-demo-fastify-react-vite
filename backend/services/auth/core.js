import { hash, verify } from "@node-rs/argon2";
import { randomBytes } from "node:crypto";
import UserModel from "../../models/UserModel.js";

const login = async (username, password) => {
	if (!username || username.trim() === "") {
		throw new Error("username is missing");
	}
	if (!password || password.trim() === "") {
		throw new Error("password is missing");
	}
	// Check if user already exists
	const user = await UserModel.findOne({ where: { username: username } });

	if (!user) {
		throw new Error("user does not exist");
	}

	const verified = await verify(user.hashed_password, password);
	return { verified, role: user.role, id: user.id, email: user.email };
};

const update = async (id, username, { newUsername, newPassword }) => {
	if (!id || id.trim() === "") {
		throw new Error("user id is missing");
	}
	if (!username || username.trim() === "") {
		throw new Error("username is missing");
	}

	// Check if user already exists
	const user = await UserModel.findOne({
		where: { id: id, username: username },
	});

	if (!user) {
		throw new Error("user does not exist");
	}

	let hasReplacedPassword = false;
	let hasReplacedUsername = false;
	const toReplacePassword = (newPassword ?? "").trim() !== "";
	const toReplaceUsername =
		(newUsername ?? "").trim() !== "" &&
		(newUsername ?? "").trim() !== username;

	if (toReplaceUsername) {
		await user.update({ username: newUsername });
		hasReplacedUsername = true;
	}
	if (toReplacePassword) {
		// Password Hashing
		const salt = randomBytes(16);

		const options = {
			salt: salt,
			parallelism: 4,
			algorithm: 2,
		};

		const hashed_password = await hash(newPassword, options);
		await user.update({ hashed_password: hashed_password });
		hasReplacedPassword = true;
	}
	return { hasReplacedPassword, hasReplacedUsername };
};

const register = async (username, password, email, contact_number) => {
	if (!username || username.trim() === "") {
		throw new Error("username is missing");
	}
	if (!password || password.trim() === "") {
		throw new Error("password is missing");
	}
	if (!email || email.trim() === "") {
		throw new Error("email is missing");
	}
	if (!contact_number || contact_number.trim() === "") {
		throw new Error("contact number is missing");
	}

	// Check if user already exists
	let user = await UserModel.findOne({ where: { username: username } });

	if (user) {
		throw new Error("user already exists");
	}

	// Password Hashing
	const salt = randomBytes(16);

	const options = {
		salt: salt,
		parallelism: 4,
		algorithm: 2,
	};

	const hashed_password = await hash(password, options);

	// Create new user
	user = await UserModel.create({
		username: username,
		hashed_password: hashed_password,
		email: email,
		contact_number: contact_number,
		salt: salt.toString(),
	});
};
export { login, register, update };
