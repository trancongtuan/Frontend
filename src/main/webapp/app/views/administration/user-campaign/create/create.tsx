import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import InformationCampaign from './info/info';
import Navigation from './navigation/navigation';
import { Container, Collapse, Card, CardTitle } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import '../create/create.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { ULTILS_ACTION_TYPES } from '../../../../constants/ultils';

export interface ICreateProps extends StateProps, DispatchProps {}

export interface ICreateState {
  collapse: boolean;
  isActive: boolean;
  isDisplayTable: string;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  state: ICreateState = {
    collapse: true,
    isActive: false,
    isDisplayTable: ULTILS_ACTION_TYPES.DISPLAY_NAVIGATION
  };
  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
  isDisPlayInfo = e => {
    this.setState({
      isDisplayTable: e
    });
  };
  render() {
    return (
      <Fragment>
        <div id="userCreate">
          <ReactCSSTransitionGroup
            className={cx('app-inner-layout chat-layout', {
              'open-mobile-menu': this.state.isActive
            })}
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Container fluid className="container-create">
              <div className="title-page">
                <div className="title-head">
                  <Translate contentKey="campaign.title-create-screen" />
                  <Link to={'/admin/user-campaign'} className="pe-7s-close-circle" />
                </div>
              </div>
              <Card className="card-info">
                <CardTitle>
                  <Translate contentKey="campaign.info-campaign" />{' '}
                  <i className="lnr-chevron-down" onClick={this.toggle}>
                    {' '}
                  </i>{' '}
                </CardTitle>
              </Card>
              <Collapse isOpen={this.state.collapse}>
                {/* info campaign */}
                <InformationCampaign onClick={this.isDisPlayInfo} />
              </Collapse>

              {/* navigation campaign */}
              <div className={this.state.isDisplayTable}>
                <Navigation />
              </div>
            </Container>
          </ReactCSSTransitionGroup>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  loading: userCampaign.loading
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
