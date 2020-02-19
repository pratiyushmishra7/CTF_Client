import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
  problems: null,
  competitions: null,
  competition: null,
  categoryProblems: null,
  profile: null,
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = ( state, action ) => {
  return updateObject(state, { error: null, loading: true});
}

const authSuccess = ( state, action ) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  })
}

const authLogOut = (state, action ) => {
  return updateObject(state, {
    token: null,
    userId: null,
  })
}

const authFail = ( state, action ) => {
  return updateObject( state, {
    error: action.error,
    loading: false,

  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROBLEMS:
      return {
        ...state,
        problems: action.problems,
      };
    case actionTypes.SET_COMPETITIONS:
      return {
        ...state,
        competitions: action.competitions,
      };
    case actionTypes.SET_COMPETITION:
      return {
        ...state,
        competition: action.competition,
      };
    case actionTypes.CAT_SET_PROBLEMS: {
      const problemArray = { ...state.problems };
      const newarray = Object.values(problemArray).filter(
        problemItem => problemItem.category === action.category,
      );
      return {
        ...state,
        categoryProblems: newarray,
      };
    }
    case actionTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case actionTypes.AUTH_START:
      return authStart( state, action );
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogOut(state, action);
    default:
      return state;
  }
};

export default reducer;