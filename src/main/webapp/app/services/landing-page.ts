import axios from 'axios';
import { IUser } from 'app/common/models/user.model';
import { ICategory } from 'app/common/models/category.model';
import { IListNewCustomer } from 'app/common/models/campaign-new-customer.model';

const apiUrl = 'v1/campaigns';

/**
 *
 * @param page -number
 * @param pageSize - number
 * @param category - string
 * @param textSearch - string
 * @return {code: number, data: Object{item: [{id: string, name: string, gmail: string, catagories: string, }, pageIndex: number, pageSize: number] }}
 */

// submit param when press button submit in ladingpage
export const landingSubmitService = (customerCode, campaignId) => {
  return axios.post(`v1/campaign/${customerCode}/customer/${campaignId}`);
};

// display landing page content to empty page
export const bindingLandingPageService = (customerCode, idCampaign) => {
  return axios.get(`v1/campaign/${idCampaign}/customer/${customerCode}`);
};
