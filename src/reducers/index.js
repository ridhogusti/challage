import { combineReducers } from 'redux';
import { 
  items,
  itemsHasErrored,
  itemsIsLoading,
  item,
  itemHasErrored,
  itemIsLoading,
  balance,
  balanceHasErrored,
  balanceIsLoading,
  casts,
  castsHasErrored,
  castsIsLoading,
  trailers,
  trailersHasErrored,
  trailersIsLoading

   } from './movie';


export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  item,
  itemHasErrored,
  itemIsLoading,
  balance,
  balanceHasErrored,
  balanceIsLoading,
  casts,
  castsHasErrored,
  castsIsLoading,
  trailers,
  trailersHasErrored,
  trailersIsLoading
});