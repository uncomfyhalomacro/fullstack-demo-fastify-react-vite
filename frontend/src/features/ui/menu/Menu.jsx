import {
	BookOpenText,
	BrainCog,
	CloudUpload,
	FileStack,
	LogOut,
	Menu,
	MessageCircleX,
	Notebook,
	ReceiptText,
	ShelvingUnit,
	SquarePercent,
	Tag,
	UsersRound,
} from "lucide-react";
import { useLogout } from "../../auth/hooks/useLogout.jsx";

export function MenuSection() {
	return (
		<div>
			<nav className="m-nav-section">
				<div className="menu-title-section">
					<Menu size={20} className="hamburger-menu-icon" />
					<h2>Menu</h2>
				</div>

				<section className="menu-items-section">
					<InvoicesMenuButton />
					<UsersMenuButton />
					<MyBusinessButton />
					<InvoiceJournalButton />
					<PriceListButton />
					<MultiInvoicingButton />
					<UnpaidInvoicesButton />
					<OfferButton />
					<InventoryControlButton />
					<MemberInvoicingButton />
					<ImportExportButton />
					<LogOutButton />
				</section>
			</nav>
		</div>
	);
}

export function MenuItemComponent({
	icon: Icon,
	placeholder,
	extraClassNames,
	setAction,
}) {
	return (
		<button type="button" className="menu-item" onClick={setAction}>
			<Icon size={20} className={`menu-item-icon ${extraClassNames}`} />
			<span>{placeholder}</span>
		</button>
	);
}

export function InvoicesMenuButton() {
	return (
		<MenuItemComponent
			icon={ReceiptText}
			placeholder={"Invoices"}
			extraClassNames={"green-button"}
		/>
	);
}

export function UsersMenuButton() {
	return (
		<MenuItemComponent
			icon={UsersRound}
			placeholder={"Users"}
			extraClassNames={"blue-button"}
		/>
	);
}

export function MyBusinessButton() {
	return (
		<MenuItemComponent
			icon={BrainCog}
			placeholder={"My Business"}
			extraClassNames={"blue-button"}
		/>
	);
}

export function InvoiceJournalButton() {
	return (
		<MenuItemComponent
			icon={Notebook}
			placeholder={"Invoice Journal"}
			extraClassNames={"blue-button"}
		/>
	);
}

export function PriceListButton() {
	return (
		<MenuItemComponent
			icon={Tag}
			placeholder={"Price List"}
			extraClassNames={"orange-button"}
		/>
	);
}

export function MultiInvoicingButton() {
	return (
		<MenuItemComponent
			icon={FileStack}
			placeholder={"Multiple Invoicing"}
			extraClassNames={"blue-button"}
		/>
	);
}

export function UnpaidInvoicesButton() {
	return (
		<MenuItemComponent
			icon={MessageCircleX}
			placeholder={"Unpaid Invoices"}
			extraClassNames={"red-button"}
		/>
	);
}

export function OfferButton() {
	return (
		<MenuItemComponent
			icon={SquarePercent}
			placeholder={"Offer"}
			extraClassNames={"yellow-button"}
		/>
	);
}

export function InventoryControlButton() {
	return (
		<MenuItemComponent
			icon={ShelvingUnit}
			placeholder={"Inventory Control"}
			extraClassNames={"blue-button"}
		/>
	);
}

export function MemberInvoicingButton() {
	return (
		<MenuItemComponent
			icon={BookOpenText}
			placeholder={"Member Invoicing"}
			extraClassNames={"dark-blue-button"}
		/>
	);
}

export function ImportExportButton() {
	return (
		<MenuItemComponent
			icon={CloudUpload}
			placeholder={"Import/Export"}
			extraClassNames={"blurple-button"}
		/>
	);
}

export function LogOutButton() {
	const { mutate, isPending } = useLogout();
	return (
		<MenuItemComponent
			icon={LogOut}
			placeholder={isPending ? "Logging out" : "Logout"}
			extraClassNames={"blue-button"}
			setAction={mutate}
		/>
	);
}
