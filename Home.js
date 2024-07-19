import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Products from "./Products";

export default function Home() {
  const [filters, setFilters] = useState({
    cars: 'none',
    model: 'none',
    usedtype: '',
    ban: 'none'
  });

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="frame">
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      <Products filters={filters} />
    </div>
  );
}
