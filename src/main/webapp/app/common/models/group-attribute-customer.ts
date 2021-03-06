export interface IListFieldData {
  id?: string;
  type?: string;
  title?: string;
  fieldValue?: string;
  personalizationTag?: string;
  value?: string;
  code?: string;
}

export interface IDataCustomer {
  id?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  merchantId?: string;
  fields: IFieldCustomer[];
}

export interface IDataCustomerCondition {
  id?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  merchantId?: string;
  fields: IFieldCustomer[];
  createdDate: Date;
  tags: Array<any>;
  tag: string;
}

export interface IFieldCustomer {
  id?: string;
  type?: string;
  title?: string;
  fieldValue?: string;
  vlaue?: string;
}

export interface ISearchAdvanced {
  fieldId?: string;
  fieldCode?: string;
  fieldType?: string;
  fieldTitle?: string;
  fieldValue?: string;
  value?: string;
  operator?: string;
}

export interface IFieldData {
  logicalOperator?: string;
  advancedSearches?: Array<ISearchAdvanced>;
}
