import { MonthMenuProps } from "~/types/index";

export const MonthMenu: React.FC<MonthMenuProps> = ({
  months,
  selectedMonth,
  onMonthChange,
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthChange(event.target.value);
  };

  return (
    <div className="month-menu">
      {
        <select value={selectedMonth} onChange={handleChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      }
    </div>
  );
};

export default MonthMenu;
