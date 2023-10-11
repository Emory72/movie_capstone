import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  totalPrice: 0,
};

const movieTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "selectSeat": {
      const { isSelected, ...seat } = action.payload;

      if (isSelected) {
        const selectedSeats = [...state.selectedSeats, seat];
        const totalPrice = state.totalPrice + seat.giaVe;

        return { ...state, selectedSeats, totalPrice };
      }

      const selectedSeats = state.selectedSeats.filter(
        (item) => item.tenGhe !== seat.tenGhe
      );
      const totalPrice = state.totalPrice - seat.giaVe;

      return { ...state, selectedSeats, totalPrice };
    }

    default:
      return state;
  }
};
const store = configureStore({
  reducer: {
    movieTicket: movieTicketReducer,
  },
});

export default store;
