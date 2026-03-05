import { Search } from "lucide-react";

export function SearchComponent({ placeholder, htmlFor, icon: Icon }) {
	return (
		<div className="search-wrapper">
			<label htmlFor={htmlFor} className="search-label">
				<input
					id={htmlFor}
					className="search-input"
					type="text"
					placeholder={placeholder}
				/>
				{Icon && <Icon className="search-icon" size={18} />}
			</label>
		</div>
	);
}

export function ArticleSearch() {
	return (
		<SearchComponent
			placeholder="Search Article No. ..."
			htmlFor="search-article-no"
			icon={Search}
		/>
	);
}

export function ProductSearch() {
	return (
		<SearchComponent
			placeholder="Search Products ..."
			htmlFor="search-product"
			icon={Search}
		/>
	);
}
