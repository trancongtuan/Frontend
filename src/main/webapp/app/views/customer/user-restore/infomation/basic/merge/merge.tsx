import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { Input, Tag, Row, Col, Collapse } from 'antd';
import { AvForm } from 'availity-reactstrap-validation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Translate, translate } from 'react-jhipster';
import './merge.scss';
import Ionicon from 'react-ionicons';
import { getListDuplicateAction, compareUserAction, mergeUserAction } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';

const { Panel } = Collapse;

const { Search } = Input;

const styleDiv = {
  chose: {
    color: '#FFFFFF',
    background: '#3866DD'
  },
  unchose: {
    color: '#343A40',
    background: 'white'
  }
};
export interface IMergeProps extends StateProps, DispatchProps {
  onClick: Function;
  id: string;
  email: string;
  phone: string;
}

export interface IMergeState {
  modal: boolean;
  current: number;
  check: boolean;
  is_chose: boolean;
  valueBtn1: string;
  valueBtn2: string;
  valueBtn3: string;
  userSelect: string;
  userId: string;
}

export class Merge extends React.Component<IMergeProps, IMergeState> {
  state: IMergeState = {
    modal: false,
    current: 0,
    check: false,
    is_chose: true,
    valueBtn1: '',
    valueBtn2: '',
    valueBtn3: '',
    userSelect: '',
    userId: this.props.id
  };

  toggle = () => {
    let { email, phone, id } = this.props;
    this.setState({
      modal: !this.state.modal,
      check: false,
      current: 0
    });
    this.props.getListDuplicateAction(id, email, phone);
  };
  onChange = e => {
    this.setState({ check: e.target.value, userSelect: e.target.value });
  };

  contentStepInfo = () => {
    const { loading, listDuplicateUser } = this.props;
    let data = (
      <Row>
        <Col span={24}>
          <div className="option-create">
            <div>
              <Label>
                <Translate contentKey="userManagement.infomation.merge.is-merge" />
              </Label>
            </div>
            <Search maxLength={160} placeholder="Tìm kiếm" onSearch={value => console.log(value)} style={{ width: 200 }} />
          </div>
          <div>
            <Table id="table-merge" striped>
              <thead>
                <tr className="text-center">
                  <th className="hand" id="name-duplicate">
                    <Translate contentKey="userManagement.home.customer-name" />
                  </th>
                  <th className="hand">
                    <Translate contentKey="userManagement.home.email" />
                  </th>
                  <th className="hand">
                    <Translate contentKey="userManagement.home.date-create" />
                  </th>
                  <th className="hand">
                    <Translate contentKey="userManagement.chosse" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {listDuplicateUser.length > 0 ? (
                  listDuplicateUser.map((event, index) => {
                    return (
                      <tr key={index}>
                        <td>{event.firstName + event.lastName}</td>
                        <td>{event.email}</td>
                        <td>{event.createdDate}</td>
                        <td>
                          <Input type="radio" name="gender" value={event.id} onChange={this.onChange} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <td colSpan={4}>
                    {' '}
                    <Translate contentKey="userManagement.none-data-customer" />
                  </td>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    );
    return data;
  };

  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  contentChosseContact = () => {
    let { is_chose } = this.state;
    let { compareUser } = this.props;
    let numberConfict = compareUser.length > 0 ? compareUser[0].conflictNumbers : '';
    let fieldConfict = compareUser.length > 0 ? compareUser[0].fieldConflicts : '';

    let data = (
      <Row>
        <Col span={24}>
          <div className="option-create" style={{ textAlign: 'center' }}>
            <div>
              <Label>
                <Translate contentKey="userManagement.info-contact-duplicate" interpolate={(numberConfict = numberConfict)} /> "
                {this.jsUcfirst(fieldConfict.split(',').join(', '))}"
              </Label>
            </div>

            <Row className="merge-customer_chose">
              <Col
                span={12}
                className="box-chose left-box"
                onClick={() => this.setState({ is_chose: true, check: true, userId: compareUser.length > 0 ? compareUser[0].id : '' })}
                style={!is_chose ? styleDiv.unchose : styleDiv.chose}
              >
                <p>{compareUser.length > 0 ? compareUser[0].firstName + compareUser[0].lastName : ''}</p>
                <label>{compareUser.length > 0 ? compareUser[0].email : ''}</label>
              </Col>
              <Col
                span={12}
                className="box-chose right-box"
                onClick={() => this.setState({ is_chose: false, check: true, userId: compareUser.length > 0 ? compareUser[1].id : '' })}
                style={is_chose ? styleDiv.unchose : styleDiv.chose}
              >
                <p>{compareUser.length > 0 ? compareUser[1].firstName + compareUser[1].lastName : ''}</p>
                <label>{compareUser.length > 0 ? compareUser[1].email : ''}</label>
              </Col>
            </Row>
            <div />
            <Collapse className="merge-collapse" bordered={false} expandIconPosition="right" defaultActiveKey={['1']}>
              <Panel style={{ color: '#3866DD' }} header="Ẩn chi tiết" key="1">
                <div>
                  <Table id="table-merge" striped>
                    <thead>
                      <tr className="text-center">
                        <th className="hand" id="name-duplicate" />
                        <th className="hand">{compareUser.length > 0 ? compareUser[0].firstName + compareUser[0].lastName : ''}</th>
                        <th className="hand">{compareUser.length > 0 ? compareUser[1].firstName + compareUser[1].lastName : ''}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compareUser.length > 0
                        ? compareUser[0].fields.map((event, index, list) => {
                            let data = (
                              <tr key={index}>
                                <td>{event.title}</td>
                                <td>{event.value}</td>
                                <td>{compareUser[1].fields[index].value}</td>
                              </tr>
                            );
                            return data;
                          })
                        : ''}
                    </tbody>
                  </Table>
                </div>
              </Panel>
            </Collapse>
          </div>
        </Col>
      </Row>
    );
    return data;
  };

  stepConfirm = () => {
    let { userId } = this.state;
    let { compareUser } = this.props;
    let userChose =
      compareUser.length > 0
        ? String(
            compareUser
              .map(event => {
                if (event.id === userId) return event.firstName + event.lastName;
              })
              .filter(Boolean)
          )
        : '';
    let userUnChose =
      compareUser.length > 0
        ? String(
            compareUser
              .map(event => {
                if (event.id !== userId) return event.firstName + event.lastName;
              })
              .filter(Boolean)
          )
        : '';
    let emailChose =
      compareUser.length > 0
        ? String(
            compareUser
              .map(event => {
                if (event.id === userId) return event.email;
              })
              .filter(Boolean)
          )
        : '';
    let emailUnChose =
      compareUser.length > 0
        ? String(
            compareUser
              .map(event => {
                if (event.id !== userId) return event.email;
              })
              .filter(Boolean)
          )
        : '';
    let data = (
      <Row>
        <Col span={24}>
          <div>
            <Label className="head-text">
              <Translate
                contentKey="userManagement.text-content.text-head-merge"
                interpolate={{
                  userFirst: userUnChose,
                  userSecond: userChose,
                  emailFirst: emailUnChose,
                  emailSecond: emailChose
                }}
              />
            </Label>
          </div>
          <div>
            <Col span={24} className="group-btn-delete">
              <Col span={2}>
                <Input
                  type="checkbox"
                  onClick={() => {
                    this.setState({ valueBtn1: $('#btn1').prop('checked') });
                  }}
                  value="a"
                  id="btn1"
                />{' '}
              </Col>
              <Col span={22}>
                <Label for="btn1" className="text">
                  <Translate
                    contentKey="userManagement.text-content.text-content"
                    interpolate={{ emailSecond: userUnChose, userSecond: emailUnChose }}
                  />
                </Label>
              </Col>
            </Col>
          </div>
          <div>
            <Col span={24} className="group-btn-delete">
              <Col span={2}>
                <Input
                  type="checkbox"
                  onClick={() => {
                    this.setState({ valueBtn2: $('#btn2').prop('checked') });
                  }}
                  value="b"
                  id="btn2"
                />{' '}
              </Col>
              <Col span={22}>
                <Label for="btn2" className="text">
                  <Translate
                    contentKey="userManagement.text-content.text-content-second"
                    interpolate={{
                      userFirst: userUnChose,
                      userSecond: userChose,
                      emailFirst: emailUnChose,
                      emailSecond: emailChose
                    }}
                  />
                </Label>
              </Col>
            </Col>
          </div>
        </Col>
      </Row>
    );
    return data;
  };

  stepTable = () => {
    let data = [
      {
        title: 'First',
        content: this.contentStepInfo()
      },
      {
        title: 'Second',
        content: this.contentChosseContact()
      },
      {
        title: 'Last',
        content: this.stepConfirm()
      }
    ];
    return data;
  };

  next = async () => {
    const { compareUserAction, user, mergeUserAction } = this.props;
    let { userSelect, userId } = this.state;
    const current = this.state.current + 1;
    if (current === 1) {
      await compareUserAction(user.id, userSelect);
    }
    this.setState({ current });
  };

  prev() {
    const current = this.state.current - 1;
    this.setState({ current, check: false });
    if (current === 1) {
      this.setState({ check: true });
    }
  }
  mergeUser = async () => {
    const { mergeUserAction, openModal, compareUser } = this.props;
    let { userId } = this.state;
    let userToMerge = compareUser
      .map(event => {
        return { id: event.id };
      })
      .filter(el => el.id !== userId);
    await mergeUserAction(userId, userToMerge[0]);
    openModal({
      show: true,
      type: 'success',
      title: translate('modal-data.title.success'),
      text: 'Gộp thành công'
    });
    this.props.onClick();
    this.toggle();
    window.location.assign('/#/app/views/customers/user-management');
  };

  render() {
    const { loading } = this.props;
    const { current } = this.state;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Button className="btn float-right jh-create-entity" outline color="primary" onClick={this.toggle}>
          <Ionicon color="#343A40" icon="md-git-merge" /> &nbsp; <Translate contentKey="userManagement.home.merge" />
        </Button>

        <Modal isOpen={this.state.modal} id="content-properties" className={current === this.stepTable().length - 1 ? 'fix-heigth' : ''}>
          <ModalHeader toggle={this.toggle} id="create-properties">
            <Translate contentKey="userManagement.infomation.merge.title" />
          </ModalHeader>
          <PerfectScrollbar>
            <ModalBody>
              <AvForm>
                <div className="steps-content">{this.stepTable()[current].content}</div>
              </AvForm>
            </ModalBody>
          </PerfectScrollbar>

          <ModalFooter>
            {current > 0 && (
              <Button style={{ float: 'left' }} id="btn-prev" color="linkaaaaa" onClick={() => this.prev()}>
                <Translate contentKey="userManagement.home.come-back" />
              </Button>
            )}

            {current < this.stepTable().length - 1 && (
              <Button
                style={{ float: 'right' }}
                disabled={!this.state.check}
                color="primary"
                onClick={() => {
                  this.next();
                }}
              >
                <Translate contentKey="userManagement.home.continue" />
              </Button>
            )}
            {current === this.stepTable().length - 1 && (
              <Button
                style={{ float: 'right' }}
                color="primary"
                disabled={this.state.valueBtn1 && this.state.valueBtn2 && !loading ? false : true}
                onClick={() => {
                  this.mergeUser();
                }}
              >
                <Translate contentKey="userManagement.home.merge" />
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}
const mapStateToProps = ({ userManagement }: IRootState) => ({
  loading: userManagement.loading,
  listDuplicateUser: userManagement.listDuplicateUser,
  user: userManagement.user,
  compareUser: userManagement.compareUser
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  compareUserAction,
  getListDuplicateAction,
  mergeUserAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Merge);