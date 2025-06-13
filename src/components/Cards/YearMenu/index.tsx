import { YearMenuProps } from "~/types/index";

export const YearMenu: React.FC<YearMenuProps> = ({
  years,
  selectedYear,
  onYearChange,
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onYearChange(event.target.value);
  };

  return (
    <div className="year-menu">
      {
        <select value={selectedYear} onChange={handleChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      }
    </div>
  );
};

export default YearMenu;
