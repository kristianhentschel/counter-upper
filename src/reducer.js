import counterColors from './colors';

const initialState = {
  counters: [
    { name: "My first count", count: 1, color: 'purple', recents: []},
    { name: "Do-not-wantitude-o-meter", count: 42, color: 'red', recents: [] },
    { name: "There are more", count: -8, color: 'orange', recents: [] },
    { name: "That's Numberwang!", count: Math.pow(2, 31) - 1, color: 'yellow', recents: [] },
    { name: "Not even close", count: 0, color: 'green', recents: [] },
    { name: "Last one I promise", count: 17, color: 'blue', recents: [] },
  ],
  filter: 'all',
  editing: false,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counters: state.counters.map(c => {
          if (c.name === action.name) {
            return {
              ...c,
              count: c.count + 1,
              recents: [new Date().toISOString(), ...(c.recents || [])],
            }
          }
          return c;
        }),
      };
    case 'DECREMENT':
      return {
        ...state,
        counters: state.counters.map(c => {
          if (c.name === action.name) {
            return {
              ...c,
              count: c.count - 1,
              recents: (c.recents || []).filter((d, i) => i !== 0),
            }
          }
          return c;
        }),
      };
    case 'SET_COUNTER_COLOR':
      return {
        ...state,
        counters: state.counters.map(c => {
          return (c.name !== action.name) ? c : {
            ...c,
            color: action.color,
          };
        }),
      };
    case 'SET_COUNTER_NAME':
      let uniqueCount = 1;
      let uniqueName = action.newName;
      while (!state.counters.every((c => c.name !== uniqueName))) {
        uniqueName = `${action.newName}-${uniqueCount}`;
        uniqueCount += 1;
      }

      return {
        ...state,
        counters: state.counters.map(c => {
          return (c.name !== action.name) ? c : {
            ...c,
            name: uniqueName,
          };
        }),
      };
    case 'SET_COUNTER_HIDDEN':
      return {
        ...state,
        counters: state.counters.map(c => {
          return (c.name !== action.name) ? c : {
            ...c,
            hidden: action.hidden,
          };
        }),
      };
    case 'DECREMENT':
      return {
        ...state,
        counters: state.counters.map(c => {
          if (c.name === action.name) {
            return {
              ...c,
              count: c.count - 1,
              recents: (c.recents || []).filter((d, i) => i !== 0),
            }
          }
          return c;
        }),
      };
    case 'DECREMENT':
      return {
        ...state,
        counters: state.counters.map(c => {
          if (c.name === action.name) {
            return {
              ...c,
              count: c.count - 1,
              recents: (c.recents || []).filter((d, i) => i !== 0),
            }
          }
          return c;
        }),
      };
    case 'DECREMENT':
      return {
        ...state,
        counters: state.counters.map(c => {
          if (c.name === action.name) {
            return {
              ...c,
              count: c.count - 1,
              recents: (c.recents || []).filter((d, i) => i !== 0),
            }
          }
          return c;
        }),
      };
    case 'ADD_COUNTER':
      return {
        ...state,
        lastCounterIndex: (state.lastCounterIndex || 0) + 1,
        counters: [
          ...state.counters,
          {
            name: `Counter ${state.lastCounterIndex}`,
            count: 0,
            color: counterColors[(state.lastCounterIndex || 0) % counterColors.length],
            recents: [],
          }
        ],
      };
    case 'DELETE_COUNTER':
      return {
        ...state,
        counters: state.counters.filter(c => (c.name !== action.name)),
      };
    case 'SET_EDITING':
      return {
        ...state,
        editing: action.editing,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};

export default reducer;
