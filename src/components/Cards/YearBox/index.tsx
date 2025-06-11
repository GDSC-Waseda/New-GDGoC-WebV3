import React, { useState, useEffect } from "react";
import { YearBoxProps } from "~/types/index";

export const YearBox: React.FC<YearBoxProps> = ({
  years,
  selectedYear,
  onYearChange,
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onYearChange(event.target.value);
  };

  return (
    <div className="year-box">
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

export default YearBox;
