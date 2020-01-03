import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { validateCampaign, getDiagramCampaign } from 'app/actions/campaign-managament';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Row, Col, Input, Select, InputNumber } from 'antd';
import { updateInfoCampaign } from 'app/actions/campaign-managament';
import './modal-wait-for-event.scss';

const { TextArea } = Input;
const { Option } = Select;
const constantEvent = {
  EVENT: 'event',
  EMAIL: 'email',
  END_TIME: 'endTime'
};
interface IModalWaitForEventProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
  idNode?: any;
}
interface IModalWaitForEventState {
  event: string;
  email: string;
  time: number;
  timer: string;
  date: string;
  idEmail: string;
}

export class ModalWaitForEvent extends React.Component<IModalWaitForEventProps, IModalWaitForEventState> {
  state: IModalWaitForEventState = {
    event: 'Khách hàng mở mail',
    email: '',
    time: 0,
    timer: '',
    date: '',
    idEmail: ''
  };

  toggle = () => {
    let { toggleModal, isOpenModal } = this.props;
    toggleModal(!isOpenModal);
  };
  save = async () => {
    let { event, email, timer, time, date, idEmail } = this.state;
    let { listFieldData, validateCampaign } = this.props;
    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : [],
      getway: listFieldData.getway ? listFieldData.getway : []
    };
    let timerEvent = {
      id: this.props.idNode.id,
      event,
      email,
      timer,
      date,
      time,
      idEmail
    };
    localStorage.removeItem('isSave');
    data.timerEvent.push(timerEvent);
    await validateCampaign(data);
    this.toggle();
  };

  // add condition time wait
  handlerTimeWait = async value => {
    let { idNode, listDiagram, getDiagramCampaign } = this.props;
    let data = listDiagram;
    let { time, timer, event, date } = this.state;
    switch (value) {
      case 'Y':
        date = 'Năm';
        break;
      case 'M':
        date = 'Tháng';
        break;
      case 'D':
        date = 'Ngày';
        break;
      case 'H':
        date = 'Giờ';
        break;
      case 'M1':
        date = 'Phút';
      case 'S':
        date = 'Giây';
      default:
        break;
    }
    if (value === 'Y' || value === 'M' || value === 'D') {
      timer = 'P' + time + value;
    } else {
      let timeSelect = value === 'M1' ? 'M' : value;
      timer = 'PT' + time + timeSelect;
    }
    await data.nodes.map(event => {
      if (event.id === idNode.id) {
        event.value = timer;
        // event.label = this.state.event;
      }
    });
    await getDiagramCampaign(data);
    await this.setState({ timer, date });
  };

  handleChange(value, option) {
    let result: string;
    let { idEmail } = this.state;
    const { listFieldData } = this.props;
    listFieldData.emailConfig &&
      listFieldData.emailConfig.map(item => {
        debugger;
        if (item.id === value) {
          result = item.nameEmail;
          idEmail = item.id;
        }
      });
    switch (option) {
      case constantEvent.EVENT:
        this.setState({ event: value });
        break;
      case constantEvent.EMAIL:
        this.setState({ email: result, idEmail });
        break;
      default:
        break;
    }
  }

  getNumber = () => {
    const { listFieldData } = this.props;
    let result: number;
    listFieldData.timerEvent &&
      listFieldData.timerEvent.map(item => {
        if (item.id === this.props.idNode.id) {
          result = item.time;
        }
      });
    return result;
  };

  getDate = () => {
    const { listFieldData } = this.props;
    let result: string;
    listFieldData.timerEvent &&
      listFieldData.timerEvent.map(item => {
        if (item.id === this.props.idNode.id) {
          result = item.date;
        }
      });
    return result;
  };

  getNameEmail = () => {
    const { listFieldData } = this.props;
    let result: string;
    listFieldData.timerEvent &&
      listFieldData.timerEvent.map(item => {
        if (item.id === this.props.idNode.id) {
          result = item.email;
          console.log(result);
        }
      });
    return result ? result : 'Vui lòng chọn Email';
  };

  render() {
    let { isOpenModal, listFieldData } = this.props;
    return (
      <Modal className="modal-message-config" isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}>Chờ Sự kiện</ModalHeader>
        <ModalBody>
          <Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">Sự kiện</label>
              </Col>
              <Col span={18}>
                <Select
                  defaultValue="Khách hàng mở mail "
                  id="event"
                  style={{ width: '100%' }}
                  onChange={event => this.handleChange(event, 'event')}
                >
                  <Option value="Khách hàng mở mail">Khách hàng mở mail</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">Email</label>
              </Col>
              <Col span={18}>
                <Select defaultValue={this.getNameEmail()} style={{ width: '100%' }} onChange={event => this.handleChange(event, 'email')}>
                  {listFieldData.emailConfig &&
                    listFieldData.emailConfig.map((item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.nameEmail}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">Kết thúc chờ sau</label>
              </Col>
              <Col span={18}>
                <Col span={17}>
                  <InputNumber
                    defaultValue={this.getNumber()}
                    style={{ width: '100%' }}
                    min={1}
                    max={10000}
                    onChange={event => {
                      let { time } = this.state;
                      time = event;
                      this.setState({ time });
                    }}
                  />
                </Col>
                <Col span={6} style={{ float: 'right' }}>
                  <Select defaultValue={this.getDate()} style={{ width: '100%' }} onChange={this.handlerTimeWait}>
                    <Option value="Y">Năm</Option>
                    <Option value="M">Tháng</Option>
                    <Option value="D">Ngày</Option>
                    <Option value="H">Giờ</Option>
                    <Option value="M1">Phút</Option>
                    <Option value="S">Giây</Option>
                  </Select>
                </Col>
              </Col>
            </Row>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="link" onClick={this.toggle}>
            Hủy
          </Button>
          <Button type="primary" onClick={this.save}>
            Chọn
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listFieldData: campaignManagament.listFieldData,
  listDiagram: campaignManagament.listDiagram
});

const mapDispatchToProps = {
  updateInfoCampaign,
  validateCampaign,
  getDiagramCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModalWaitForEvent);
