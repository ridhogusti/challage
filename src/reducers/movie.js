
export function itemsHasErrored (state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function itemsIsLoading (state = false, action) {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function items (state = [], action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return JSON.stringify(action);
    default:
      return state;
  }
}


/**
* It's a good convention to name the reducers
* after the resulting store's state property.
* This makes it clear what the reducer is responsible for updating.
*/
export function itemHasErrored(state = false, action) {
  switch (action.type) {
    case 'ITEM_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function itemIsLoading(state = false, action) {
  switch (action.type) {
    case 'ITEM_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function item(state = [], action) {
  switch (action.type) {
    case 'ITEM_FETCH_DATA_SUCCESS':
      return action.item;
    default:
      return state;
  }
}

/**
* It's a good convention to name the reducers
* after the resulting store's state property.
* This makes it clear what the reducer is responsible for updating.
*/
export function balanceHasErrored(state = false, action) {
  switch (action.type) {
    case 'BALANCE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function balanceIsLoading(state = false, action) {
  switch (action.type) {
    case 'BALANCE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function balance(state = [], action) {
  // console.log(action.purchasedlist);
  switch (action.type) {
    case 'BALANCE_FETCH_DATA_SUCCESS':
      return JSON.stringify(action);
    default:
      return state;
  }
}

export function castsHasErrored(state = false, action) {
  switch (action.type) {
    case 'CASTS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function castsIsLoading(state = false, action) {
  switch (action.type) {
    case 'CASTS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function casts(state = [], action) {
  switch (action.type) {
    case 'CASTS_FETCH_DATA_SUCCESS':
      return action.casts;
    default:
      return state;
  }
}

export function trailersHasErrored(state = false, action) {
  switch (action.type) {
    case 'TRAILERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function trailersIsLoading(state = false, action) {
  switch (action.type) {
    case 'TRAILERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function trailers(state = [], action) {
  switch (action.type) {
    case 'TRAILERS_FETCH_DATA_SUCCESS':
      return action.trailers;
    default:
      return state;
  }
}
