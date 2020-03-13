import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Row, Col, Popover, Input, Button, Layout, Menu, Breadcrumb, Icon, Select, Modal as ModalAntd } from 'antd';
import { getDiagramCampaign, validateCampaign } from 'app/actions/campaign-management';
const { Header, Content, Footer, Sider } = Layout;
import FlowItemValidate from '../item-pannel/flow-item-pannel-validate';

interface ISiderValidateProps extends StateProps, DispatchProps {
  toogle: Function;
  isCloseSider: boolean;
}
interface ISiderValidateState {
  collapsed: boolean;
}
export class SiderValidate extends React.Component<ISiderValidateProps, ISiderValidateState> {
  state: ISiderValidateState = {
    collapsed: false
  };

  render() {
    let { collapsed } = this.state;
    return (
      <Sider width={370} collapsed={collapsed}>
        <div className="header-sider">
          <label className="tool-bar" style={{ display: collapsed ? 'none' : 'contents' }}>
            KẾT QUẢ KIỂM TRA
          </label>
          {collapsed ? (
            <Icon
              style={{ fontSize: '20px' }}
              type="close-circle"
              onClick={() => {
                this.props.toogle(false);
              }}
            />
          ) : (
            <Icon
              style={{ fontSize: '20px' }}
              type="close-circle"
              onClick={() => {
                this.props.toogle(false);
              }}
              className="icon-collapse"
            />
          )}
        </div>
        <hr />
        <div className="logo" style={{ display: collapsed ? 'none' : 'block' }}>
          <FlowItemValidate />
        </div>
      </Sider>
    );
  }
}
const mapStateToProps = ({ campaignManagement }: IRootState) => ({
  loading: campaignManagement.loading,
  listDiagram: campaignManagement.listDiagram,
  listFieldData: campaignManagement.listFieldData
});

const mapDispatchToProps = {
  getDiagramCampaign,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SiderValidate);