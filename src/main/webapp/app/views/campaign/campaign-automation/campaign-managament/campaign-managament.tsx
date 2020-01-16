import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col, Breadcrumb, Modal } from 'antd';
import $ from 'jquery';
import LoaderAnim from 'react-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import { getTreeFolder, insertTreeFolder } from 'app/actions/campaign-managament';
import TreeFolder from './tree-folder/tree-folder';
import Campaign from './campaign-list/campaign-list';
import './campaign-managament.scss';

const { confirm } = Modal;

export interface ICampaginManagamentProps extends StateProps, DispatchProps {}

export interface ICampaginManagamentState {
  hover: boolean;
  idTree: string;
}

class CampaginManagament extends React.Component<ICampaginManagamentProps, ICampaginManagamentState> {
  state: ICampaginManagamentState = {
    hover: false,
    idTree: ''
  };
  getId = idTree => {
    this.setState({ idTree });
  };

  render() {
    let { idTree } = this.state;
    return (
        <div>
          <Row className="row-main" style ={{height : "1200px"}}>
            <Col span={4} className=" d-lg-block bg-white  align-items-center"  style ={{height : "100%"}}>
              <TreeFolder onClick={this.getId} />
            </Col>
            <Col span={20} className="bg-white  align-items-center" style ={{height : "100%"}}>
              <Row className="header-row">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item>
                    <a onClick={() => window.location.assign('/#/app/views/customers/user-management')} href="javascript:void(0);">
                      <FontAwesomeIcon icon={faHome} />
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-auto')} href="javascript:void(0);">
                      <Translate contentKey = "campaign-auto.title" />
                    </a>
                  </Breadcrumb.Item>

                  <label className="ant-breadcrumb-link"><Translate contentKey = "campaign-auto.managament.list-campaign" /></label>
                </Breadcrumb>
              </Row>
              <Campaign folder_id_choose={idTree} />
            </Col>
          </Row>
        </div>
    );
  }
}

const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  list_tree_folder: campaignManagament.tree_folder
});

const mapDispatchToProps = { openModal, closeModal, getTreeFolder, insertTreeFolder };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CampaginManagament);
