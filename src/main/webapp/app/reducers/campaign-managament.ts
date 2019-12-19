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

interface IInfoCampaign {
  des: string;
  name: string;
  tag: string;
  nameTag: string;
}

interface IListDiagram {
  nodes: any[];
  edges: any[];
  groups: any[];
}

interface IListFieldData {
  listCampign: any[];
  emailConfig: any[];
  messageConfig: any[];
  timerEvent: any[];
  timer: any[];
}

interface IListEmailTest {
  id: string;
  email: string;
}

interface IInfoVersion {
  nameVersion: string;
  idVersion: string;
}
interface IListVersion {
  id: string;
  name: string;
  cjVersionId: string;
  version: number;
  tags: string;
  status: string;
  contactNumbers: string;
  modifiedDate: string;
}
const initialCampaignManagament = {
  tree_folder: [] as IDataTreeFolder[],
  campaign: {} as ICampaign,
  loading: false,
  statusCampaign: {} as IStatusCampagin,
  listCampaignAuto: [] as IListCampaignAuto[],
  listNode: '',
  listInfoCampaing: {} as IInfoCampaign,
  listDiagram: {} as IListDiagram,
  listFieldData: {} as IListFieldData,
  listEmailTest: [] as IListEmailTest[],
  infoVersion: {} as IInfoVersion,
  listVersion: [] as IListVersion[]
};

export type HandleCampaignManagament = typeof initialCampaignManagament;

export default (state = initialCampaignManagament, action) => {
  switch (action.type) {
    case REQUEST(CAMPAIGN_MANAGAMENT.GET_LIST_CAMPAIGN_AUTO):
    case REQUEST(CAMPAIGN_MANAGAMENT.COUNT_CAMPAIGN):
    case REQUEST(CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER):
    case REQUEST(CAMPAIGN_MANAGAMENT.GET_EMAIL_TEST):
    case REQUEST(CAMPAIGN_MANAGAMENT.GET_LIST_VERSION):
      return {
        ...state,
        loading: true
      };
    case FAILURE(CAMPAIGN_MANAGAMENT.GET_LIST_VERSION):
    case FAILURE(CAMPAIGN_MANAGAMENT.GET_LIST_CAMPAIGN_AUTO):
    case FAILURE(CAMPAIGN_MANAGAMENT.COUNT_CAMPAIGN):
    case FAILURE(CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER):
    case FAILURE(CAMPAIGN_MANAGAMENT.GET_EMAIL_TEST):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(CAMPAIGN_MANAGAMENT.GET_LIST_VERSION):
      return {
        ...state,
        loading: false,
        listVersion: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGAMENT.GET_EMAIL_TEST):
      return {
        ...state,
        loading: false,
        listEmailTest: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGAMENT.GET_LIST_CAMPAIGN_AUTO):
      return {
        ...state,
        loading: false,
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
      return { ...state, data: action.payload };

    case CAMPAIGN_MANAGAMENT.GET_NODE:
      return { ...state, listNode: action.payload };

    case CAMPAIGN_MANAGAMENT.GET_INFO_CAMPAIGN:
      return { ...state, listInfoCampaing: action.payload };

    case CAMPAIGN_MANAGAMENT.GET_DIAGRAM_CAMPAIGN:
      return { ...state, listDiagram: action.payload };
    case CAMPAIGN_MANAGAMENT.VALIDATE_DIAGRAM_CAMPAIGN:
      return { ...state, listFieldData: action.payload };
    case CAMPAIGN_MANAGAMENT.SAVE_CAMPAIGN_AUTO_VERSION:
      return { ...state, infoVersion: action.payload };
    default:
      return state;
  }
};
