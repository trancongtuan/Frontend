import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getUser, getRoles, updateUser, createUser, reset, getUserCategories } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import FormMultiSelectWidget from './user-categories-tag';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IUserManagementUpdateState {
  isNew: boolean;
  Category: any[];
}

export class UserManagementUpdate extends React.Component<IUserManagementUpdateProps, IUserManagementUpdateState> {
  state: IUserManagementUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.id,
    Category: []
  };

  // todo : hiện Modal , không chuyển trang
  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getUser(this.props.match.params.id);
      console.log(this.props.match.params.id);
    }
    this.props.getRoles();
    this.props.getUserCategories('');
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.categorys) {
      this.setState({
        Category: nextProps.user.categorys
      });
    }
  }

  saveUser = (event, values) => {
    if (this.state.isNew) {
      this.props.createUser(values);
    } else {
      const { user } = this.props;
      let data = {
        id: user.id,
        name: values.name,
        phone: values.mobile,
        email: values.email,
        categorys: this.state.Category
      };
      this.props.updateUser(data);
    }
    // this.handleClose();
  };
  // todo : không load lại trang trước , chỉ gọi hàm getUser
  handleClose = () => {
    this.props.history.push('/admin/user-management');
  };

  handleCreate = name => {
    this.props.getUserCategories(name);
  };

  handleChange = category => {
    console.log(category);
    this.setState({
      Category: category
    });
  };

  render() {
    const isInvalid = false;

    const { user, users, loading, updating, listCategory, roles } = this.props;
    const { Category } = this.state;
    console.log(user);
    return (
      <div>
        <Row className="updateTitle">
          <Col md="8">
            <h1>
              <Translate contentKey="userManagement.home.editLabel" />
            </h1>
          </Col>
        </Row>
        <div className="updatePanel">
          <Row className="justify-content-center">
            <Col md="8" className="fullNameContent">
              {/* {loading ? (
                <p>Loading...</p>
              ) : ( */}
              <AvForm onValidSubmit={this.saveUser}>
                <AvGroup>
                  <Label for="name">
                    <Translate contentKey="userManagement.name" />
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="name"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: translate('register.messages.validate.login.required')
                      },
                      // pattern: {
                      //   value: '^[_.@A-Za-z0-9-]*$',
                      //   errorMessage: translate('register.messages.validate.login.pattern')
                      // },
                      minLength: {
                        value: 1,
                        errorMessage: translate('register.messages.validate.login.minlength')
                      },
                      maxLength: {
                        value: 50,
                        errorMessage: translate('register.messages.validate.login.maxlength')
                      }
                    }}
                    value={user.name}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="mibole">
                    <Translate contentKey="userManagement.mobile" />
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="mobile"
                    validate={{
                      maxLength: {
                        value: 11,
                        errorMessage: translate('entity.validation.maxlength', { max: 11 })
                      },
                      required: {
                        value: true,
                        errorMessage: translate('global.messages.validate.mobile.required')
                      }
                    }}
                    value={user.phone}
                  />
                </AvGroup>
                <AvGroup>
                  <AvField
                    name="email"
                    label={translate('global.form.email.label')}
                    placeholder={translate('global.form.email.placeholder')}
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: translate('global.messages.validate.email.required')
                      },
                      email: {
                        errorMessage: translate('global.messages.validate.email.invalid')
                      },
                      minLength: {
                        value: 5,
                        errorMessage: translate('global.messages.validate.email.minlength')
                      },
                      maxLength: {
                        value: 254,
                        errorMessage: translate('global.messages.validate.email.maxlength')
                      }
                    }}
                    value={user.email}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="categories">
                    <Translate contentKey="userManagement.categories" />
                  </Label>
                  <FormMultiSelectWidget
                    listCategory={listCategory}
                    defaultCate={Category}
                    handleChange={this.handleChange}
                    handleCreate={this.handleCreate}
                  />
                </AvGroup>
                {/* <AvGroup check> */}
                {/* <AvGroup>
                  <Label>
                    <AvInput type="checkbox" name="categories" value={user.categories} />{' '}
                    <Translate contentKey="userManagement.categories">categories</Translate>
                  </Label>
                </AvGroup> */}
                {/* <AvGroup>
                  <Label for="categories">
                    <Translate contentKey="userManagement.langKey">Language Key</Translate>
                  </Label>
                  <AvField type="select" className="form-control" name="langKey" value={user.langKey}>
                    {locales.map(locale => (
                      <option value={locale} key={locale}>
                        {languages[locale].name}
                      </option>
                    ))}
                  </AvField>
                </AvGroup> */}
                {/* <AvGroup>
                  <Label for="authorities">
                    <Translate contentKey="userManagement.categories">Language Key</Translate>
                  </Label>
                  <AvInput type="select" className="form-control" name="authorities" value={user.authorities} multiple>
                    {roles.map(role => (
                      <option value={role} key={role}>
                        {role}
                      </option>
                    ))}
                  </AvInput>
                </AvGroup> */}
                {/* <Button tag={Link} to="/admin/user-management" replace color="info"> */}
                <Button replace color="info" tag={Link} to="/admin/user-management">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back" />
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save" />
                </Button>
              </AvForm>
              {/* )} */}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  users: storeState.userManagement.users,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating,
  listCategory: storeState.userManagement.listCategory
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset, getUserCategories };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementUpdate);
