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
  trailersIsLoading,
  similars,
  similarsHasErrored,
  similarsIsLoading,
  recomendeds,
  recomendedsHasErrored,
  recomendedsIsLoading

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
  trailersIsLoading,
  similars,
  similarsHasErrored,
  similarsIsLoading,
  recomendeds,
  recomendedsHasErrored,
  recomendedsIsLoading
});