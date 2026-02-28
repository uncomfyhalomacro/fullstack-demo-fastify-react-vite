import { AsYouType } from "libphonenumber-js";

const insertCountryCodeFromContactNumber = (model, options) => {
	if (model.contact_number && typeof model.contact_number === "string") {
		if (model.contact_number.trim() === "") {
			model.country_calling_code = null;
			return;
		}
		try {
			const asYouType = new AsYouType();
			asYouType.input(model.contact_number);
			if (!asYouType.isValid()) throw new Error("Invalid number");
			model.country_calling_code = asYouType.getNumber().country ?? null;
		} catch (err) {
			throw new Error(`${err.message}`);
		}
	} else {
		model.country_calling_code = null;
	}
};

export { insertCountryCodeFromContactNumber };
