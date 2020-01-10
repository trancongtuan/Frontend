import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Row, Checkbox, Button, Modal } from 'antd';
import { Table, ButtonGroup } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import SweetAlert from 'sweetalert-react';
import ReactPaginate from 'react-paginate';
import { IEmail } from 'app/common/model/email-config.model';
import {
  getEmailsAction, deleteEmailAction
} from 'app/actions/email-config';
import './email.scss';

interface IEmailManagementProps extends StateProps, DispatchProps { }
interface IEmailManagementState {
  activePage: number;
  itemsPerPage: number;
  textSearch?: string;
  listCheckboxItem: ICheckboxItem[];

}

interface ICheckboxItem extends IEmail {
  checked: boolean;
}

const { confirm } = Modal;
class EmailManagement extends React.Component<IEmailManagementProps, IEmailManagementState> {
  state: IEmailManagementState = {
    activePage: 0,
    itemsPerPage: 2,
    textSearch: '',
    listCheckboxItem: []
  };

  componentDidMount() {
    let { activePage, itemsPerPage } = this.state;
    this.props.getEmailsAction('', activePage, itemsPerPage);
  }

  onchangeTextSearch = (event) => {
    this.setState({
      textSearch: event.target.value
    });
  }

  setPageIndex = pageIndex => {
    let { itemsPerPage } = this.state;
    this.props.getEmailsAction('', parseInt(pageIndex), itemsPerPage);
    this.setState({ activePage: parseInt(pageIndex) });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.emails != prevState.emails) {
      let listCheckboxItem = nextProps.emails.map(item => ({ ...item, checked: false }))
      return {
        emails: nextProps.emails,
        listCheckboxItem
      };
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.listCheckboxItem != this.state.listCheckboxItem) {
      this.setState({ ...this.state });
    }
  }


  onChangeCheckboxItem = (emailId, checked) => {
    let { listCheckboxItem } = this.state;
    listCheckboxItem && listCheckboxItem.forEach(item => (emailId === item.id ? (item.checked = checked) : item));
    this.setState({
      listCheckboxItem: listCheckboxItem
    });
  }

  deleteEmail = async () => {
    let { listCheckboxItem, itemsPerPage } = this.state;
    let listItemChecked = listCheckboxItem.filter(item => item.checked == true);
    if (listItemChecked && listItemChecked.length == 1) {
      confirm({
        zIndex: 1000000,
        title: 'Xóa',
        content: 'Bạn thực sự muốn xóa ?',
        onOk: async () => {
          await this.props.deleteEmailAction(listItemChecked[0].id);
          this.props.getEmailsAction('', 0, itemsPerPage);
        },
        okText: 'Xóa',
        onCancel() { },
        cancelText: 'Hủy bỏ'
      });
    }
  }

  render() {
    let { total, totalPages, loading } = this.props;
    let { textSearch, activePage, itemsPerPage, listCheckboxItem } = this.state;
    let isVisable = false;
    listCheckboxItem && listCheckboxItem.forEach(item => {
      if (item.checked) {
        isVisable = true;
      }
    });
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Loader message={spinner1} show={loading} priority={1}>
        <Fragment>
          <div className="email-management">
            <div className="email-title-header">
              <label>Quản lý email</label>
            </div>
            <Row>
              <div className="email-search-group">
                <Input
                  style={{ float: 'right' }}
                  id="searchText"
                  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={textSearch}
                  onChange={this.onchangeTextSearch}
                  onPressEnter={() => {
                    this.props.getEmailsAction(textSearch, activePage, itemsPerPage);
                  }}
                  placeholder="Tìm kiếm email"
                />
                <Button
                  type="primary"
                  onClick={() => {
                    window.location.assign('#');
                  }}
                > Thêm mới
                </Button>
              </div>
            </Row>
            <Row>
              <div className="email-body">
                {
                  isVisable ? (
                    <div className="button-group">
                      <Button color="primary">
                        Sửa
                      </Button>
                      <Button color="primary" style={{ marginLeft: "5px" }}>
                        Sao chép
                      </Button>
                      <Button color="danger" style={{ marginLeft: "5px" }} onClick={() => this.deleteEmail()}>
                        Xóa
                        </Button>
                    </div>
                  ) : ('')
                }

                <label className="total-email">Danh sách email ({total})</label>
                <Table striped>
                  <thead>
                    <tr className="text-center">
                      <th className="checkbox-td" colSpan={5}> <Checkbox /></th>
                      <th colSpan={25}>Tên email</th>
                      <th colSpan={25}> Tiêu đề email</th>
                      <th colSpan={25}> Người tạo</th>
                      <th colSpan={20}> Chỉnh sửa gần nhất</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCheckboxItem && listCheckboxItem.length > 0 ? (
                      listCheckboxItem.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td colSpan={5} style={{ textAlign: "center" }}>
                              <Checkbox
                                id={item.id}
                                checked = {item.checked}
                                onChange={event => this.onChangeCheckboxItem(item.id, event.target.checked)} />
                            </td>
                            <td colSpan={25}>{item.name}</td>
                            <td colSpan={25}>{item.subject}</td>
                            <td colSpan={25}>{item.createdUser}</td>
                            <td colSpan={20} style={{ textAlign: "center" }}>{item.modifiedDate}</td>
                          </tr>
                        )
                      })
                    ) : (
                        <tr><td className="none-data" colSpan={100}> Không có dữ liệu khách hàng</td></tr>
                      )}
                  </tbody>
                </Table>
                <div className="email-navigation">
                  {totalPages && totalPages >= 2 ? (
                    <Row className="justify-content-center" style={{ float: 'right' }}>
                      <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={event => this.setPageIndex(event.selected)}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </Row>
                  ) : (
                      ''
                    )}
                </div>
              </div>
            </Row>
          </div>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = ({ emailConfigState }: IRootState) => ({
  loading: emailConfigState.loading,
  total: emailConfigState.emailData.totalElements,
  emails: emailConfigState.emailData.content,
  totalPages: emailConfigState.emailData.totalPages
});

const mapDispatchToProps = {
  getEmailsAction, deleteEmailAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailManagement);
