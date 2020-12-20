import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "This is the COOLEST Cube Ever",
      description:
        "The Nike ZoomX SuperRep Surge is built for classes and workouts that keep you moving. From the treadmill to the rowing machine to strength training, you get the amazing energy return of ultralight Nike ZoomX foam.",
      price: 15.0,
      image:
        "https://i.ibb.co/68W75Kw/jd-386109-a.jpg",
    },
    {
      id: 2,
      title: "Nike Bag",
      description:
        "The Nike Brasilia 9.0 gym bag has a minimalist lightweight design with an opening at the top, so you can store your training equipment and get going. Shoulder straps also act as drawbars to secure your things.",
      price: 20.0,
      image:
        "https://i.ibb.co/2W7cKzh/d516d2248fc04fc0b24fd1410c86acf2.jpg",
    },
    {
      id: 3,
      title: "Joggers",
      description:
        "The Jordan Flight fleece trousers, which are must-haves for everyday use, are made of warm, soft, machine-knitted french terry. They have a Flight mark on the leg.",
      price: 150.0,
      image:
        "https://i.ibb.co/C5kdg7y/jd-380066-a.jpg",
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
