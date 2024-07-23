import { useTranslations } from "next-intl";
import styles from "./Filter.module.css";
import Select from "@/components/shared/select/Select";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useFilterContext } from "@/contexts/FilterContext";

const options = [
    { value: "", label: "Select" },
    { value: "date", label: "Date" },
];

const filterOptions = [
    { value: "", label: "All" },
    { value: "HTML", label: "Html" },
    { value: "Python", label: "Python" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Reactjs", label: "Reactjs" },
    { value: "Nextjs", label: "Nextjs" },
    { value: "Vuejs", label: "Vuejs" },
];

export default function Filter() {
    const t = useTranslations("ProjectsPage");
    const { filters, setFilters } = useFilterContext();

    const handleSortChange = (value: string) => {
        setFilters({ ...filters, sortby: value });
    };

    const handleFilterChange = (value: string) => {
        setFilters({ ...filters, filterValue: value });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, searchText: e.target.value });
    };

    return (
        <form className={styles.filter} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.flex_item}>
                <FaSearch />
                <input
                    type="text"
                    placeholder={t("search.search-bar.placeholder")}
                    value={filters.searchText || ""}
                    onChange={handleTextChange}
                />
                <IoClose
                    onClick={() => setFilters({ ...filters, searchText: "" })}
                    className={filters.searchText ? styles.active : ""}
                />
            </div>
            <div className={styles.flex_item}>
                <label>{t("search.Relevance.label")}</label>
                <Select
                    options={options}
                    value={filters.sortby || ""}
                    onChange={handleSortChange}
                />
            </div>
            <div className={styles.flex_item}>
                <label>{t("search.Filter.label")}</label>
                <Select
                    options={filterOptions}
                    value={filters.filterValue || ""}
                    onChange={handleFilterChange}
                />
            </div>
        </form>
    );
}
