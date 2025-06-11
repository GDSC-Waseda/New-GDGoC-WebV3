import React, { useState, useEffect } from "react";
import { CategoryBarProps } from "~/types/index";

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {

  return (
    <div className="category-bar">
      {
        categories.map((category) => (
          <div
            key={category}
            className={`category-item ${category === selectedCategory ? "selected" : ""}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </div>
        ))
      }
    </div>
  );
};

export default CategoryBar;
