import { Plus, Printer, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
export function ButtonExtras() {
	return (
		<div className="h-button-extras">
			<NewProductButton />
			<PrintListButton />
			<NewToggleButton />
		</div>
	);
}

export function ButtonComponent({
	icon: Icon,
	placeholder,
	onClick,
	extraClassNames,
}) {
	return (
		<button type="button" onClick={onClick}>
			{placeholder ?? "Placeholder Button"}
			<Icon size={30} className={`h-button-extras-icon ${extraClassNames}`} />
		</button>
	);
}

export function PrintListButton() {
	return (
		<ButtonComponent
			icon={Printer}
			placeholder={"Print List"}
			extraClassNames={"dark-blue-button"}
		/>
	);
}

export function NewProductButton() {
	return (
		<ButtonComponent
			icon={Plus}
			placeholder={"New Product"}
			extraClassNames={"green-button"}
		/>
	);
}

export function NewToggleButton() {
	const [toggle, setToggle] = useState(true);

	return (
		<ButtonComponent
			onClick={() => setToggle(!toggle)}
			icon={toggle ? ToggleLeft : ToggleRight}
			extraClassNames={`${toggle ? "green-button" : "dark-blue-button"}`}
			placeholder={toggle ? "Advance Mode" : "Simple Mode"}
		/>
	);
}
