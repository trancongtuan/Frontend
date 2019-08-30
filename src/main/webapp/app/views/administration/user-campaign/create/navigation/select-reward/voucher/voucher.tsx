import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col, Card, CardBody, CardTitle, FormGroup, Label, Input, Container, Table } from 'reactstrap';

import { DropdownList } from 'react-widgets';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../voucher/voucher.scss';

let colors = ['Orange', 'Red', 'Blue', 'Purple'];

library.add(faSpinner);
export interface VocherProps {}

export interface VocherState {
  activeTab: string;
  name: string;
  shareholders: any[];
  dropdownOpen: boolean;
  people: any[];
  value: any[];
  valueList: any[];
  displayTable: string;
}
class Vocher extends React.Component<VocherProps, VocherState> {
  state: VocherState = {
    name: '',
    shareholders: [{ name: '' }],
    activeTab: '',
    dropdownOpen: false,
    people: colors,
    value: [],
    valueList: [],
    displayTable: 'display-voucher-ticket'
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: '' }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  handleCreate(name) {
    let { people, value } = this.state;

    let newOption = {
      name,
      id: people.length + 1
    };

    this.setState({
      value: [...value, newOption], // select new option
      people: [...people, newOption] // add new option to our dataset
    });
  }
  onChangeList = value => {
    this.setState({
      value
    });
    this.state.valueList.push(value);
    console.log(this.state.valueList.length);
    if (this.state.valueList.length > 0) {
      this.setState({
        displayTable: ''
      });
    } else {
      this.setState({
        displayTable: 'display-voucher-ticket'
      });
    }
  };

  render() {
    let { value, people } = this.state;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Container fluid>
            <Row>
              <Col md="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>E-voucher</CardTitle>
                    <Row form>
                      <Col md={12}>
                        <DropdownList
                          data={people}
                          value={value}
                          allowCreate="onFilter"
                          onCreate={name => this.handleCreate(name)}
                          onChange={this.onChangeList}
                          textField="name"
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className={this.state.displayTable}>
              <Table>
                <thead>
                  <tr>
                    <th>giá trị</th>
                    <th>thời hạn </th>
                    <th>số lượng </th>
                  </tr>
                  <tr>
                    <td>10.000 VNĐ</td>
                    <td>27/8 - 28/9</td>
                    <td>2.000 mã</td>
                  </tr>
                </thead>
              </Table>
            </div>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default Vocher;