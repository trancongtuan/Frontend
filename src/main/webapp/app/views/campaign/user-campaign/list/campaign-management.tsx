import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, CardHeader, Card, Container } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import SweetAlert from 'sweetalert-react';
import { DISPLAY_STATUS_ALL, DISPLAY_STATUS_PAUSE, DISPLAY_STATUS_ACTION, DISPLAY_STATUS_COMPLETE } from 'app/constants/common';
import './campaign-management.scss';
import { getCampaignInfoByStatus, getCampaignInfoById, getCountCampaignByStatus } from 'app/actions/user-campaign';
import AllCamp from './tab/all-camp/all-camp';
import { openModal, closeModal } from 'app/actions/modal';

export interface ICreateCampaignProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface ICreateCampaignState {
  // display campaign info by id
  modal?: boolean;
  // display campaign list follow tab's number
  activeTab: string;
}

export class CreateCampaign extends React.Component<ICreateCampaignProps, ICreateCampaignState> {
  state: ICreateCampaignState = {
    modal: false,
    // display start with tab 1
    activeTab: '1'
  };

  constructor(props) {
    super(props);
    this.props.getCampaignInfoByStatus(DISPLAY_STATUS_ALL);
  }

  componentDidMount() {
    this.props.getCountCampaignByStatus();
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }

    if (tab === '1') {
      this.props.getCampaignInfoByStatus(DISPLAY_STATUS_ALL);
    } else if (tab === '2') {
      this.props.getCampaignInfoByStatus(DISPLAY_STATUS_ACTION);
    } else if (tab === '3') {
      this.props.getCampaignInfoByStatus(DISPLAY_STATUS_PAUSE);
    } else {
      this.props.getCampaignInfoByStatus(DISPLAY_STATUS_COMPLETE);
    }
  };

  render() {
    const { modalState } = this.props;
    return (
      <div id="campaign-management">
        <SweetAlert
          title={modalState.title ? modalState.title : 'No title'}
          confirmButtonColor=""
          show={modalState.show ? modalState.show : false}
          text={modalState.text ? modalState.text : 'No'}
          type={modalState.type ? modalState.type : 'error'}
          onConfirm={() => this.props.closeModal()}
        />
        <h3 id="user-management-page-heading">
          <Translate contentKey="campaign.title" />
          <Link to={`/app/views/campaigns/user-campaign/new`} className="btn btn-primary float-right jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="campaign.createCamp" />
          </Link>
        </h3>
        <div />
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card tabs="true" className="mb-3">
                    <CardHeader>
                      <Nav justified>
                        <NavItem>
                          <NavLink
                            href="javascript:void(0);"
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => {
                              this.toggle('1');
                            }}
                          >
                            <Translate contentKey="campaign.allCamps" /> {''}({this.props.total})
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="javascript:void(0);"
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => {
                              this.toggle('2');
                            }}
                          >
                            <Translate contentKey="campaign.onAction" />
                            {''}({this.props.totalActive})
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="javascript:void(0);"
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => {
                              this.toggle('3');
                            }}
                          >
                            <Translate contentKey="campaign.onPause" />
                            {''}({this.props.totalNotActive})
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="javascript:void(0);"
                            className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => {
                              this.toggle('4');
                            }}
                          >
                            <Translate contentKey="campaign.complete" />
                            {''}({this.props.totalFinish})
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </CardHeader>

                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <AllCamp value={''} />
                      </TabPane>
                      <TabPane tabId="2">
                        <AllCamp value={1} />
                      </TabPane>
                      <TabPane tabId="3">
                        <AllCamp value={0} />
                      </TabPane>
                      <TabPane tabId="4">
                        <AllCamp value={2} />
                      </TabPane>
                    </TabContent>
                  </Card>
                </Col>
              </Row>
            </Container>
          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ userCampaign, handleModal }: IRootState) => ({
  camps: userCampaign.camps,
  loading: userCampaign.loading,
  total: userCampaign.total,
  totalActive: userCampaign.totalActive,
  totalFinish: userCampaign.totalFinish,
  totalNotActive: userCampaign.totalNotActive,
  modalState: handleModal.data
});

const mapDispatchToProps = { getCampaignInfoByStatus, getCampaignInfoById, getCountCampaignByStatus, openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaign);