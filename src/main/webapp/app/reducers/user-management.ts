import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';

const initialState = {
  loading: false,
  errorMessage: null,
  users: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: defaultValue,
  updating: false,
  updateSuccess: false,
  getNameFile: '',
  totalItems: 0
};

export type UserManagementState = Readonly<typeof initialState>;

// Reducer
export default (state: UserManagementState = initialState, action): UserManagementState => {
  switch (action.type) {
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_ROLES):
      return {
        ...state
      };
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_USERS):
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(USER_MANAGE_ACTION_TYPES.CREATE_USER):
    case REQUEST(USER_MANAGE_ACTION_TYPES.UPDATE_USER):
    case REQUEST(USER_MANAGE_ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_USERS):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_ROLES):
    case FAILURE(USER_MANAGE_ACTION_TYPES.CREATE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.UPDATE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_ROLES):
      return {
        ...state,
        authorities: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        totalItems: action.payload.headers['x-total-count']
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        loading: false,
        user: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.CREATE_USER):
    case SUCCESS(USER_MANAGE_ACTION_TYPES.UPDATE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: defaultValue
      };
    case USER_MANAGE_ACTION_TYPES.RESET:
    case USER_MANAGE_ACTION_TYPES.EXPORT_FILE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
