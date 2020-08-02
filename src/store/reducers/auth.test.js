import React from 'react';

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer TEST', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });
    it('should store a token aupon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-userId-ZZZ'
        })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })
});