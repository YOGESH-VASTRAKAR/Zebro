import React, { createContext, useContext, useReducer } from 'react';

// Cart item structure
const initialCartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
  isCartOpen: false
};

// Cart actions
const cartActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  CLOSE_CART: 'CLOSE_CART'
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.ADD_ITEM:
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        updatedItems = [...state.items, action.payload];
      }

      const updatedTotalAmount = updatedItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );

      const updatedTotalItems = updatedItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalItems: updatedTotalItems
      };

    case cartActions.REMOVE_ITEM:
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      
      const newTotalAmount = filteredItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );

      const newTotalItems = filteredItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        ...state,
        items: filteredItems,
        totalAmount: newTotalAmount,
        totalItems: newTotalItems
      };

    case cartActions.UPDATE_QUANTITY:
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (itemIndex >= 0) {
        const updatedItems = [...state.items];
        
        if (action.payload.quantity <= 0) {
          updatedItems.splice(itemIndex, 1);
        } else {
          updatedItems[itemIndex].quantity = action.payload.quantity;
        }

        const updatedTotalAmount = updatedItems.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        );

        const updatedTotalItems = updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          ...state,
          items: updatedItems,
          totalAmount: updatedTotalAmount,
          totalItems: updatedTotalItems
        };
      }
      return state;

    case cartActions.CLEAR_CART:
      return {
        ...state,
        items: [],
        totalAmount: 0,
        totalItems: 0
      };

    case cartActions.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };

    case cartActions.CLOSE_CART:
      return {
        ...state,
        isCartOpen: false
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addItemToCart = (product) => {
    dispatch({
      type: cartActions.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }
    });
  };

  const removeItemFromCart = (productId) => {
    dispatch({
      type: cartActions.REMOVE_ITEM,
      payload: productId
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: cartActions.UPDATE_QUANTITY,
      payload: {
        id: productId,
        quantity: quantity
      }
    });
  };

  const clearCart = () => {
    dispatch({ type: cartActions.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: cartActions.TOGGLE_CART });
  };

  const closeCart = () => {
    dispatch({ type: cartActions.CLOSE_CART });
  };

  const value = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalItems: cartState.totalItems,
    isCartOpen: cartState.isCartOpen,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
    toggleCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};