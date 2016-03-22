import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import { connect } from 'react-redux';
import { logout } from 'reducers/auth';
import { fetch as fetchCaptcha } from 'reducers/captcha';
import Navbar from './Navbar/Navbar';

@connect(
  state => ({
    currentUser: state.auth.user,
    song: state.song,
  }),
  dispatch => ({
    ...bindActionCreators({ show, fetchCaptcha, logout }, dispatch)
  })
)
export default class HomePage extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    currentUser: PropTypes.object,
    song: PropTypes.object,
    show: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    fetchCaptcha: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.song.id !== nextProps.song.id) {
      this.notice(nextProps.song);
    }
  }

  notice = (song) => {
    if (document.hasFocus()) return;

    /* eslint no-unused-vars: 0 */
    const notification = new Notification(song.name, {
      body: song.artist,
      icon: song.cover,
    });
  }

  showSigninModal = () => {
    this.props.fetchCaptcha();
    this.props.show('signin');
  }

  logoutUser = () => {
    this.props.logout();
  }

  render() {
    const { children, currentUser } = this.props;

    return (
      <div>
        <Navbar
          currentUser={currentUser}
          showSigninModal={this.showSigninModal}
          logoutUser={this.logoutUser}
        />
        {children}
      </div>
    );
  }
}
