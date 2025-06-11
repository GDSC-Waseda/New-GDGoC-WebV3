import React, { useState, useEffect } from "react";
import { CategoryBarProps } from "~/types/index";

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Set breakpoint at 768px
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value);
  };

  return (
    <div className="category-bar">
      {isSmallScreen || categories.length > 3 ? (
        <select value={selectedCategory} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      ) : (
        categories.map((category) => (
          <div
            key={category}
            className={`category-item ${category === selectedCategory ? "selected" : ""}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryBar;
