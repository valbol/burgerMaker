import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';

//Class factory..
const withErrrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            axios.interceptors.response.use(res => res, err => {
                console.log(err);
                this.setState({ error: err });
            });
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