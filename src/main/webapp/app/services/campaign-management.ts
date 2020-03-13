import { authHeaders } from './header';
import axios from 'axios';

const urlCJ = 'v1/cj-folders';
const urlCampaign = 'v1/cjs';
const urlVersion = 'v1/cj-versions';

//call API get list Tree
export const getTreeFolderService = () => {
  return axios.get(urlCJ);
};

//call API insert tree
export const insertTreeFolderService = data => {
  const url = `${urlCJ}/create`;
  return axios.post(url, data);
};

//call API edit tree
export const editTreeFolderService = data => {
  const url = `${urlCJ}/${data.id}/update`;
  return axios.post(url, data.name);
};

//call API delete tree
export const deleteTreeFolderService = data => {
  const url = `${urlCJ}/${data}/delete`;
  return axios.post(url);
};

//call API move Tree Folder
export const moveTreeFolderService = data => {
  const url = `${urlCJ}/${data.idChil}/move/${data.idParent}`;
  return axios.post(url);
};

export const getListCampaignInfolder = (folderId: string, textSearch?: string, tagIds?: string, page?: number, pageSize?: number) => {
  return axios.get(urlCJ + '/' + folderId + '/cjs', { params: { textSearch, tagIds, page, pageSize }, headers: { authHeaders } });
};

// call API count status campaign
export const getStatusCampaignService = () => {
  const url = `${urlCampaign}/count`;
  return axios.get(url);
};

// call API get list campaign auto
export const getListCampaignService = (status: string, page?: number, pageSize?: number) => {
  //TODO: CJ tự động-DS CJ- Thêm chức năng chọn hiển thị CJ
  return axios.get(urlCampaign, { params: { status, page, pageSize } });
};

//call API save campaign auto
export const saveCampaignAutoService = data => {
  const url = `${urlCampaign}/create-process`;
  return axios.post(url, data);
};

//call API list Email tesst
export const getEmailTestService = () => {
  return axios.get(`v1/email-white-lists`);
};

/* call API Version */

//call Api test Campaign
export const testCampaignService = data => {
  const url = `${urlCampaign}/test-process`;
  return axios.post(url, data);
};

//call API get list version
export const getListVersionService = id => {
  const url = `${urlCampaign}/${id}/cj-versions`;
  return axios.get(url, { headers: authHeaders });
};

//call API delete version
export const deleteVersionService = data => {
  const url = `${urlVersion}/delete`;
  return axios.post(url, data);
};

//call API stop version
export const stopVersionService = id => {
  const url = `${urlVersion}/${id}/stop`;
  return axios.post(url);
};

//call API clone version
export const cloneVersionService = id => {
  const url = `${urlVersion}/${id}`;
  return axios.get(url);
};

//call API get list customer version process
export const getListCustomerVersionProcessService = (textSearch: string, id, page?: number) => {
  const url = `${urlVersion}/${id}/customers`;
  return axios.get(url, { params: { page, pageSize: 10, textSearch } });
};

// Call API list customer interactive
export const viewInteractiveService = id => {
  const url = `v1/history/activity-instance`;
  return axios.get(url, { params: { processInstanceId: id } });
};

export const activeProcessCampaignService = id => {
  const url = `${urlVersion}/${id}/start-process`;
  return axios.post(url);
};

// call API Template campaign
export const getTemplateCampaignService = () => {
  const url = `v1/cj-templates`;
  return axios.get(url);
};

//call Api clone version by Id
export const cloneVersionByIdService = id => {
  const url = `${urlCampaign}/${id}/versions/clone`;
  return axios.get(url);
};

//call API validate Graph
export const validateGraphService = (data) => {
  const url = `${urlVersion}/validate`;
  return axios.post(url, data);
};