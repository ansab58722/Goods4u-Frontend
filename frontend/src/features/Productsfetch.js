
import React from 'react'
const Productsfetch=async({setData},category)=> {

    // Load products data from localStorage if available; otherwise fetch and cache
      try {
        const cachedShoes = localStorage.getItem('shoesData');
        const cachedCloths = localStorage.getItem('clothsData');
        let shoes = null;
        let cloths = null;
        if (cachedShoes) {
          try { shoes = JSON.parse(cachedShoes); } catch (_) { shoes = null; }
        }
        if (cachedCloths) {
          try { cloths = JSON.parse(cachedCloths); } catch (_) { cloths = null; }
        }
        const fetchPromises = [];

        if (!shoes) {
          fetchPromises.push(
            (async () => {
              const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/shoes`);
              if (!response.ok) throw new Error('Failed to fetch shoes data');
              const json = await response.json();
              shoes = json?.data ?? [];
              try { localStorage.setItem('shoesData', JSON.stringify(shoes)); } catch (_) {}
            })()
          );
        }
        if (!cloths) {
          fetchPromises.push(
            (async () => {
              const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cloths`);
              if (!response.ok) throw new Error('Failed to fetch cloths data');
              const json = await response.json();
              cloths = json?.data ?? [];
              try { localStorage.setItem('clothsData', JSON.stringify(cloths)); } catch (_) {}
            })()
          );
        }

        if (fetchPromises.length) {
          await Promise.all(fetchPromises);
        }

        const combined = [...(cloths || []), ...(shoes || [])];

switch (category) {
  case "cloths":
    
  setData(cloths);
    break;
 case "footwears":
    
  setData(shoes);
    break;

  default:
  setData(combined);
    break;
}
   

      } catch (e) {
       console.log(e)
      }
    

    


}

export default Productsfetch

