
export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
  }
}

export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  }
}

export function itemsFetchDataSuccess(items, total_pages) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items,
    total_pages
  }
}

export function itemsFetchData(url) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true))

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(itemsIsLoading(false))
        return response
      })
      .then((response) => response.json())
      .then((items) => dispatch(itemsFetchDataSuccess(items.results, items.total_pages)))
      .catch(() => dispatch(itemsHasErrored(true)))
  }
}

// The action creators that each return an action
export function itemHasErrored(bool) {
  return {
    type: 'ITEM_HAS_ERRORED',
    hasErrored: bool
  };
}

export function itemIsLoading(bool) {
  return {
    type: 'ITEM_IS_LOADING',
    isLoading: bool
  };
}

export function itemFetchDataSuccess(item) {
  return {
    type: 'ITEM_FETCH_DATA_SUCCESS',
    item
  };
}

export function itemFetchData(url) {
  return (dispatch) => {
    dispatch(itemIsLoading(true));

    fetch(url)
      .then((response) => {

        if(!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(itemIsLoading(false));

        return response;

      })
      .then((response) => response.json())
      .then((item) => dispatch(itemFetchDataSuccess(item)))
      .catch(() => dispatch(itemHasErrored(true)));
  }
}

// The action creators that each return an action
export function balanceHasErrored(bool) {
  return {
    type: 'BALANCE_HAS_ERRORED',
    hasErrored: bool
  };
}

export function balanceIsLoading(bool) {
  return {
    type: 'BALANCE_IS_LOADING',
    isLoading: bool
  };
}

export function balanceFetchDataSuccess(balance, purchasedlist) {
  return {
    type: 'BALANCE_FETCH_DATA_SUCCESS',
    balance,
    purchasedlist
  };
}

export function balancePurchase(remain, purchasedlist) {
  return (dispatch) => {
    dispatch(balanceFetchDataSuccess(remain,purchasedlist));  
  }
}

export function initBalance(balance=null, purchasedlist=null) {
  if(balance === null || typeof balance === 'undefined'){
    balance = 100000;
  }
  if(purchasedlist === null || typeof purchasedlist === 'undefined'){
    purchasedlist = [];
  }
  return (dispatch) => {
    dispatch(balanceFetchDataSuccess(balance,purchasedlist));    
  }
}


export function castsHasErrored(bool) {
  return {
    type: 'CASTS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function castsIsLoading(bool) {
  return {
    type: 'CASTS_IS_LOADING',
    isLoading: bool
  };
}

export function castsFetchDataSuccess(casts) {
  return {
    type: 'CASTS_FETCH_DATA_SUCCESS',
    casts
  };
}

export function castFetchData(url) {
  return (dispatch) => {
    dispatch(castsIsLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(castsIsLoading(false));

        return response;
      })
      .then((response) => response.json())

      .then((casts) => {
        dispatch(castsFetchDataSuccess(casts.cast));
      })

      .catch(() => dispatch(castsHasErrored(true)));
  };
}

export function trailersHasErrored(bool) {
  return {
    type: 'TRAILERS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function trailersIsLoading(bool) {
  return {
    type: 'TRAILERS_IS_LOADING',
    isLoading: bool
  };
}

export function trailersFetchDataSuccess(trailers) {
  return {
    type: 'TRAILERS_FETCH_DATA_SUCCESS',
    trailers
  };
}

export function trailersFetchData(url) {
  return (dispatch) => {
    dispatch(trailersIsLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(trailersIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((trailers) => {
        dispatch(trailersFetchDataSuccess(trailers.results));
      })
      .catch(() => dispatch(trailersHasErrored(true)));
  };
}
