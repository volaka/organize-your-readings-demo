import update from 'immutability-helper';
import uuidv4 from 'uuid/v4'
import {ADD_READINGS, ADD_READINGS_FAIL, ADD_READINGS_REQUEST, SELECT_READING} from "../actionTypes";

const initialState = {
  readings: {},
  categories: {},
  loading: false,
  selectedReading: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_READINGS_REQUEST:
      return update(state, {
        loading: {$set: true}
      });
    case ADD_READINGS: {
      const url = action.payload['retrieved_url'].split('?')[0];
      console.log(url);
      if (state.readings.hasOwnProperty(url)) {
        return update(state, { loading: false });
      }

      const reading = update(action.payload, { id: { $set: uuidv4() }});
      const category = reading.categories[0].label.split('/')[1];
      if (state.categories.hasOwnProperty(category)) {
        return update(state, {
          readings: { [url]: { $set: reading} },
          categories: { [category]: { $push: [url]}},
          loading: { $set: false }
        });
      }
      return update(state, {
        readings: { [url]: { $set: reading} },
        categories: { [category]: { $set: [url]}},
        loading: { $set: false }
      });
    }
    case ADD_READINGS_FAIL:
      return update(state, {
        readings: { loading: { $set: false }}
      });
    case SELECT_READING:
      return update(state, {
        selectedReading: { $set: action.payload }
      });
    default:
      return state;
  }
}
