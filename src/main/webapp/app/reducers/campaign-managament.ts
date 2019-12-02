import { CAMPAIGN_MANAGAMENT } from 'app/constants/campaign-managament';
import { REQUEST, FAILURE, SUCCESS } from './action-type.util';
import { number } from 'prop-types';

interface IDataTreeFolder {
  id: string;
  name: string;
  path: string;
  parentId: string;
  cjFolders: [
    {
      id: string;
      name: string;
      path: string;
      parentId: string;
      cjFolders: any[];
    }
  ];
}

interface ICampaign {
  total: number;
  data: [
    {
      id: string;
      name: string;
      cjVersionId: string;
      version: number;
      tags: string;
      status: string;
      contactNumbers: number;
      modifiedDate: string;
    }
  ];
}

interface IStatusCampagin {
  total: string;
  totalDraft: string;
  totalRunning: string;
  totalFinish: string;
}

interface IListCampaignAuto {
  id: string;
  name: string;
  cjVersionId: string;
  version: number;
  tags: string;
  status: string;
  contactNumbers: number;
  modifiedDate: string;
}

const initialCampaignManagament = {
  tree_folder: [] as IDataTreeFolder[],
  campaign: {} as ICampaign,
  loading: false,
  statusCampaign: {} as IStatusCampagin,
  listCampaignAuto: [] as IListCampaignAuto[]
};

export type HandleCampaignManagament = typeof initialCampaignManagament;

export default (state = initialCampaignManagament, action) => {
  switch (action.type) {
    case REQUEST(CAMPAIGN_MANAGAMENT.GET_LIST_CAMPAIGN_AUTO):
    case REQUEST(CAMPAIGN_MANAGAMENT.COUNT_CAMPAIGN):
    case REQUEST(CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER):
      return {
        ...state,
        loading: true
      };
    case FAILURE(CAMPAIGN_MANAGAMENT.GET_LIST_CAMPAIGN_AUTO):
    case FAILURE(CAMPAIGN_MANAGAMENT.COUNT_CAMPAIGN):
    case FAILURE(CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER):
      return {
        ...state,
        loading: false
      };
    case SUCCESS(CAMPAIGN_MANAGAMENT.GET_LIST_CAMPAIGN_AUTO):
      return {
        ...state,
        loading: true,
        listCampaignAuto: action.payload.data
      };

    case SUCCESS(CAMPAIGN_MANAGAMENT.COUNT_CAMPAIGN):
      return {
        ...state,
        loading: false,
        statusCampaign: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER):
      return {
        ...state,
        loading: false,
        tree_folder: action.payload.data
      };

    case CAMPAIGN_MANAGAMENT.CREATE_TREE_FOLDER:
      return { ...state, data: action.data };

    case REQUEST(CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: true
      };

    case FAILURE(CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: false
      };
    case SUCCESS(CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: false,
        campaign: action.payload.data
      };

    case CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER:
      return { ...state, data: action.data };

    default:
      return state;
  }
};
