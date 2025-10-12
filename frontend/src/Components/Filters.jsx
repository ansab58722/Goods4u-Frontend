import React from 'react'
import "../css/Allproducts.css";
import "../css/Productcard.css";
function Filters({
  removecheck,
  filteritems,
fetched_items,
  setallitems,
  filtercategory,
  filterprice,
  productCategory
}) {
  const getCategoryOptions = () => {
 
switch (productCategory) {
  case "Footwears":
    return [
      { value: "Running", label: "Running" },
      { value: "football", label: "Football" },
      { value: "casual", label: "Casual" }
    ];
    
    case "Cloths":
      return [
        { value: "Blouse", label: "Blouse" },
        { value: "Jacket", label: "Jacket" },
        { value: "SweatShirt", label: "Sweatshirt" },
        { value: "Full Outfit", label: "Full Outfit" }
      ];

  

  default: return []
    break;
}


  
     
   
  };

    return (
        
 <div className="filters-container">
      <div className="filters-header">
        <h2>Filters</h2>
        <button className="clear-filters-btn" onClick={() => {
          document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
          setallitems(fetched_items);
        }}>
          Clear All
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-section-header">
          <h3>Gender</h3>
          <span className="filter-count">3</span>
        </div>
        <div className="filter-options">
          <label className="filter-option">
            <input
              className="filter-checkbox"
              type="checkbox"
              value="MEN"
              onClick={(e) => {
                if (e.target.checked === true) {
                  filteritems(e.target.value);
                }
                document
                  .querySelectorAll(".filter-checkbox[data-group='gender']")
                  .forEach((element) => {
                    element.checked = false;
                  });
                removecheck(e);
                e.target.checked = true;
              }}
              data-group="gender"
            />
            <span className="checkbox-custom"></span>
            <span className="filter-label">Men</span>
          </label>
          <label className="filter-option">
            <input
              className="filter-checkbox"
              type="checkbox"
              value="Women"
              onClick={(e) => {
                if (e.target.checked === true) {
                  filteritems(e.target.value);
                }
                document
                  .querySelectorAll(".filter-checkbox[data-group='gender']")
                  .forEach((element) => {
                    element.checked = false;
                  });
                e.target.checked = true;
                removecheck(e);
              }}
              data-group="gender"
            />
            <span className="checkbox-custom"></span>
            <span className="filter-label">Women</span>
          </label>
          <label className="filter-option">
            <input
              className="filter-checkbox"
              type="checkbox"
              value="KIDS"
              onClick={(e) => {
                if (e.target.checked === true) {
                  filteritems(e.target.value);
                }
                document
                  .querySelectorAll(".filter-checkbox[data-group='gender']")
                  .forEach((element) => {
                    element.checked = false;
                  });
                e.target.checked = true;
                removecheck(e);
              }}
              data-group="gender"
            />
            <span className="checkbox-custom"></span>
            <span className="filter-label">Kids</span>
          </label>
        </div>
      </div>

        <div className="filter-section">
        <div className="filter-section-header">
          <h3>Category</h3>
          <span className="filter-count">{getCategoryOptions().length}</span>
        </div>
        <div className="filter-options">
        {getCategoryOptions().map((option) => (

<label className="filter-option">
<input
  className="filter-checkbox"
  name="checkbox"
  type="checkbox"
  value={option.value}
  onClick={(e) => {
    if (e.target.checked === true) {
      filtercategory(e.target.value);
    }
    removecheck(e);
  }}
  data-group="category"
/>
<span className="checkbox-custom"></span>
<span className="filter-label">{option.label}</span>
</label>                       
              ))}

        
        </div>
      </div>
      
    
      <div className="filter-section">
        <div className="filter-section-header">
          <h3>Price Range</h3>
          <span className="filter-count">2</span>
        </div>
        <div className="filter-options">
          <label className="filter-option">
            <input
              className="filter-checkbox"
              type="checkbox"
              value="high-to-low"
              onClick={(e) => {
                if (e.target.checked === true) {
                  filterprice("high-to-low");
                }
                document
                  .querySelectorAll(".filter-checkbox[data-group='price']")
                  .forEach((element) => {
                    element.checked = false;
                  });
                e.target.checked = true;
              }}
              data-group="price"
            />
            <span className="checkbox-custom"></span>
            <span className="filter-label">High to Low</span>
          </label>
          <label className="filter-option">
            <input
              className="filter-checkbox"
              type="checkbox"
              value="Classical"
              onClick={(e) => {
                if (e.target.checked === true) {
                  filterprice("low-to-high");
                }
                document
                  .querySelectorAll(".filter-checkbox[data-group='price']")
                  .forEach((element) => {
                    element.checked = false;
                  });
                e.target.checked = true;
              }}
              data-group="price"
            />
            <span className="checkbox-custom"></span>
            <span className="filter-label">Low to High</span>
          </label>
        </div>
      </div>
    </div>



    )
}

export default Filters
