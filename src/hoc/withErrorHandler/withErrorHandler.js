import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    constructor() {
      super();
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      });  
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render () {
      return (
        <>
          <Modal 
            show={this.state.error}
            toggleBackDrop={this.errorConfirmedHandler}>
            {this.state.error ?  this.state.error.message: null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      )
    }
  }
}

export default withErrorHandler;