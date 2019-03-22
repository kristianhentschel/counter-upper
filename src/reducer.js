const initialState = {
  counters: [
    { name: "My first count", count: 1, color: 'purple'},
    { name: "Do-not-wantitude-o-meter", count: 42, color: 'red' },
    { name: "There are more", count: -8, color: 'orange' },
    { name: "That's Numberwang!", count: Math.pow(2, 31) - 1, color: 'yellow' },
    { name: "Not even close", count: 0, color: 'green' },
    { name: "Last one I promise", count: 17, color: 'blue' },
  ],
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counters: state.counters.map(c => {
          if (c.name === action.name) {
            return { ...c, count: c.count + 1 }
          }
          return c;
        }),
      };
    case 'DECREMENT':
      return {
        ...state,
        counters: counters.map(c => {
          if (c.name === action.name) {
            return { ...c, count: c.count - 1 }
          }
          return c;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
