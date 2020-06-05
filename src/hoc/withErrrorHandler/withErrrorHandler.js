import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';

//Class factory..
const withErrrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptoes = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resInterceptoes =axios.interceptors.response.use(res => res, err => {
                console.log(err);
                this.setState({ error: err });
            });
        }
        //To prevent memory leaks, as otherwise we are munting the above function each time when we use the HOC, but we need only once
        componentWillUnmount(){
            console.log('Will unmount', this.reqInterceptoes, this.resInterceptoes)
            axios.interceptors.request.eject(this.reqInterceptoes);
            axios.interceptors.response.eject(this.resInterceptoes);
        }

        errorConfirmedHandler = () => {
                this.setState({error: null})
        }

        render() {
            return (
                <Auxi>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxi>
            );
        }
    }
}

export default withErrrorHandler;