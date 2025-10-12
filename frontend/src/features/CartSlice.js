import { createSlice } from "@reduxjs/toolkit";



    const initialState = { 
        cart:[],
        totalPrice:0,
        selectedproduct:[],
        Relatedproducts:[],
        searchresults:[]
        };







export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addTocart:(state,action)=>{

let find=state.cart.findIndex((item)=>item.id===action.payload.id)

if (find>=0){

  state.cart[find].quantity=state.cart[find].quantity+action.payload.quantity;
   state.totalPrice=state.totalPrice+state.cart[find].new_price*action.payload.quantity;
     
}else{
  
    state.cart.push(action.payload)
    state.totalPrice=state.totalPrice+action.payload.new_price*action.payload.quantity;
}
}

,incrementdecrement:(state,action)=>{
  let find=state.cart.findIndex((item)=>item.id===action.payload.id)
if (find>=0){

 if( action.payload.value===-1){
  state.cart[find].quantity=state.cart[find].quantity-1
  state.totalPrice=state.totalPrice-action.payload.price;
}
  
  else{
    state.cart[find].quantity=state.cart[find].quantity+1
    state.totalPrice=state.totalPrice+action.payload.price;
  
  }


}
},
removefromcart:(state,action)=>{
  let find=state.cart.findIndex((item)=>item.id===action.payload.id)
if (find>=0){

  state.cart.splice([find],1)
  state.totalPrice=state.totalPrice-action.payload.new_price*action.payload.quantity;
  

}
},

productselectedfeature:(state,action)=>{

  state.selectedproduct=action.payload;
},

RelatedProductsFeature:(state,action)=>{

  state.Relatedproducts = action.payload.filter(item => item.category === state.selectedproduct.category);

  
},


searchresultsfeature:(state,action)=>{

  state.searchresults=action.payload;

},

  
},





});


export default cartSlice.reducer;
export const{searchresultsfeature,addTocart,incrementdecrement,removefromcart,productselectedfeature,RelatedProductsFeature}=cartSlice.actions


