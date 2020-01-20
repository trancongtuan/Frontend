import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Card, CardBody,
} from 'reactstrap';

import ReactTable from "react-table-6";
import PageTitle from '../../../../layout/AppMain/PageTitle';

import {makeData} from "./utils";

export default class DataTableFixedHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            data: makeData()
        };
    }

    render() {
        const {data} = this.state;

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <PageTitle
                            heading="Data Tables"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <ReactTable
                                        data={data}
                                        columns={[
                                            {
                                                Header: "Name",
                                                columns: [
                                                    {
                                                        Header: "First Name",
                                                        accessor: "firstName"
                                                    },
                                                    {
                                                        Header: "Last Name",
                                                        id: "lastName",
                                                        accessor: d => d.lastName
                                                    }
                                                ]
                                            },
                                            {
                                                Header: "Info",
                                                columns: [
                                                    {
                                                        Header: "Age",
                                                        accessor: "age"
                                                    }
                                                ]
                                            }
                                        ]}
                                        defaultPageSize={20}
                                        style={{
                                            height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                                        }}
                                        className="-striped -highlight -fixed"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
