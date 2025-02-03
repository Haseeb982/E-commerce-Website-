import React from 'react';

const Shopfilters = ({
  filters,
  filterState,
  setfilterState,
  clearFilters,
}) => {
  return (
    <div className="section-shop">
      <h3 className="text-xl filter-title">Filters</h3>

      {/* Categories */}
      <div className="flex flex-col custom-space-y">
        <h4 className="font-medium text-lg custom-space-titles">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="flex items-center">
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              checked={filterState.category === category}
              onChange={(e) =>
                setfilterState({ ...filterState, category: e.target.value })
              }
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Colors */}
      <div 
      
      
      Name="flex flex-col custom-space-y">
        <h4 className="font-medium text-lg custom-space-titles">Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className="flex items-center">
            <input
              type="radio"
              name="color"
              id="color"
              value={color}
              checked={filterState.color === color}
              onChange={(e) =>
                setfilterState({ ...filterState, color: e.target.value })
              }
            />
            <span>{color}</span>
          </label>
        ))}
      </div>

      {/* Price Ranges */}
      <div className="flex flex-col custom-space-y">
        <h4 className="font-medium text-lg custom-space-titles">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              id="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filterState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setfilterState({ ...filterState, priceRange: e.target.value })
              }
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters */}
      <div className="bg-red-500 clear-btn text-white rounded text-center">
        <button onClick={clearFilters}>Clear All</button>
      </div>
    </div>
  );
};

export default Shopfilters;
