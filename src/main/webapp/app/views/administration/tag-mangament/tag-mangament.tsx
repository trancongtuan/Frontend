import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../tag-mangament/tag-mangament.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import TagAddNew from './tag-add-new/tag-add-new';
import TagList from './tag-list/tag-list';
import { getListTags } from '../../../services/tag-management';

export interface ITagManagementProps extends StateProps, DispatchProps {}
export interface ITagManagementState {}
class TagManagement extends React.Component<ITagManagementProps, ITagManagementState> {
  state = {};

  componentDidMount() {}

  render() {
    const { loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="tag-management">
        <div id="user-management-title">
          <Translate contentKey="tag-management.header" />
        </div>
        <Fragment>
          <Row>
            <TagAddNew />
            <TagList />
          </Row>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagManagement);
