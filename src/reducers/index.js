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
  castsIsLoading

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
  castsIsLoading
});