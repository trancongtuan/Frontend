import { TabPane, CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../select-reward/select-reward.scss';

import { Translate } from 'react-jhipster';
import React, { Fragment, Component, useState } from 'react';
import Voucher from '../select-reward/voucher/voucher';

export interface SelectRewardProps {}

export interface SelectRewardState {
  activeTab: string;
  displayVoucher: string;
}
class SelectReward extends React.Component<SelectRewardProps, SelectRewardState> {
  state: SelectRewardState = {
    activeTab: '1',
    displayVoucher: 'display-voucher'
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  onClickVoucher = () => {
    this.setState({
      displayVoucher: ''
    });
  };
  onClickNoVoucher = () => {
    this.setState({
      displayVoucher: 'display-voucher'
    });
  };

  render() {
    return (
      <div className="select-reward">
        <CardTitle>CHỌN QUÀ TẶNG</CardTitle>
        <Card>
          <CardBody>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" onClick={this.onClickNoVoucher} /> Thông báo (Không có quà)
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" onClick={this.onClickVoucher} /> E-voucher
                </Label>
              </FormGroup>
            </FormGroup>
            <div className={this.state.displayVoucher}>
              <Voucher />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SelectReward;