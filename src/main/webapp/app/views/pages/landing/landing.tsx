import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';

import './landing.scss';
import { getCampaignInfoByStatus, getCampaignInfoById, getCountCampaignByStatus } from 'app/actions/user-campaign';
import { bindingLandingPage } from 'app/actions/landing-page';

export interface ILandingProps extends StateProps, DispatchProps, RouteComponentProps<{ customerCode: string; idCampaign: string }> {
  script?: string;
  htmlContent: string;
}

export interface ILandingState {
  modal?: boolean;
  activeTab: string;
}

export class Landing extends React.Component<ILandingProps, ILandingState> {
  state: ILandingState = {
    modal: false,
    activeTab: '1'
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const customerCode = this.props.match.params.customerCode;
    const idCampaign = this.props.match.params.idCampaign;
    console.info('idCampaign', idCampaign);
    console.info('customerCode', customerCode);

    // call service get thong tin landing page o day
    this.props.bindingLandingPage(customerCode, idCampaign);
  }

  componentDidMount() {
    // load script xu ly form submit
    const script = document.createElement('script');

    script.innerHTML = this.props.script;
    script.innerHTML = `
    function onSubmit() {
      var path = window.location.pathname;
      var arr = path.split("/");
      var campaign = arr[arr.indexOf("campaign")+ 1];
      var customer = arr[arr.indexOf("customer")+ 1];
      var form=document.getElementById('mgm');
            var campaignEl =  document.getElementById('campaign');
            if (!campaignEl)
            {
            campaignEl = document.createElement('input');//prepare a new input DOM element
        campaignEl.setAttribute('id', "campaign");//set the param name
            campaignEl.setAttribute('name', "campaign");//set the param name
        campaignEl.setAttribute('value', campaign);//set the value
        campaignEl.setAttribute('type', 'hidden')//set the type
      form.appendChild(campaignEl);
      }
            var customerEl =  document.getElementById('customer');
            if (!customerEl)
            {
            customerEl = document.createElement('input');//prepare a new input DOM element
        
            customerEl.setAttribute('id', "customer");//set the param name
            customerEl.setAttribute('name', "customer");//set the param name
        customerEl.setAttribute('value', customer);//set the value
        customerEl.setAttribute('type', 'hidden')//set the type
      form.appendChild(customerEl);
      }
    
            form.action= 'http://localhost:8088/v1/campaign/'+ campaign+'/customer/'+customer;
      form.submit();
    }
    `;
    console.log(script);
    script.async = true;
    document.body.appendChild(script);

    // action for button submit in landingpage
    // this.props.landingSubmit()
    // window.addEventListener('mousedown', event => {
    //   let doc = document.getElementsByClassName['btn'];
    //   console.log(doc);
    //   // window.location.assign('http://localhost:9000/#/pages/ngm/9e6e2110-8a6e-4277-9180-00d60de614bd/customer/91a65346-f6c3-494a-9337-58e42e644421')
    // });
  }

  render() {
    const landingContent = this.props.landingContent;

    return <div dangerouslySetInnerHTML={{ __html: landingContent }} />;
  }
}

const mapStateToProps = ({ userCampaign, landingPage }: IRootState) => ({
  camps: userCampaign.camps,
  loading: userCampaign.loading,
  total: userCampaign.total,
  totalActive: userCampaign.totalActive,
  totalFinish: userCampaign.totalFinish,
  totalNotActive: userCampaign.totalNotActive,
  landingContent: landingPage.landingContent
});

const mapDispatchToProps = { getCampaignInfoByStatus, getCampaignInfoById, getCountCampaignByStatus, bindingLandingPage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
