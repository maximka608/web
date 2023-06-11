import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';
import Register from '../register';
import Login from '../login';
import Main from '../main';

fetchMock.enableMocks();
const successResponse = 'Successfully registered';
const failResponse = 'Passwords are not the same';

describe('Register page', () => {

    it('renders register form', () => {
        render(<Router><Register/></Router>);
        expect(screen.getByTestId("register-form"))
            .toBeInTheDocument();

        const inputName = screen.getByPlaceholderText(/username/i);
        fireEvent.change(inputName, {target: {value: 'user'}});
        expect(inputName.value).toBe('user');

        const inputEmail = screen.getByPlaceholderText(/email/i);
        fireEvent.change(inputEmail, {target: {value: 'user@gmail.com'}});
        expect(inputEmail.value).toBe('user@gmail.com');
        
        const inputPassword = screen.getByPlaceholderText("Password");
        fireEvent.change(inputPassword, {target: {value: 'user'}});
        expect(inputPassword.value).toBe('user');

        const inputConfirmPassword = screen.getByPlaceholderText(/confirm password/i);
        fireEvent.change(inputConfirmPassword, {target: {value: 'user'}});
        expect(inputConfirmPassword.value).toBe('user');
    });

    it('test routes button', () => {
        render(<Router><Register/></Router>);
        const signButton = screen.getByTestId("change-signup-button");
        fireEvent.click(signButton);
        expect(screen.getAllByText(/sign up/i)).toBeTruthy();

        const loginButton = screen.getByTestId("change-login-button");
        fireEvent.click(loginButton);
        render(<Router><Login/></Router>);
        expect(screen.getAllByText(/log in/i)).toBeTruthy();

        const mainButton = screen.getAllByTestId("change-main-button");
        fireEvent.click(mainButton[0]);
        render(<Router><Main/></Router>);
        expect(screen.getAllByText(/Your Notes/i)).toBeTruthy();
    })

    it('registers user', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            render(<Router><Register/></Router>);
        });

        const registerButton = screen.getByTestId('handleregister');
        fireEvent.click(registerButton);

        const headers = new Headers();
        headers.set('content-type', 'application/json');
        expect(fetch)
            .toHaveBeenCalledWith('http://127.0.0.1:5000/user', {
                'body': '{"name":"","email":"","password":""}',
                'headers': headers,
                'method': 'POST'
            });

        await expect(fetch)
            .toHaveBeenCalledTimes(1);
    });

    it('registers user with passwords dont match', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(failResponse)));
            render(<Router><Register/></Router>);
        });

        const inputPassword = screen.getByPlaceholderText("Password");
        fireEvent.change(inputPassword, {target: {value: 'user'}});
        expect(inputPassword.value).toBe('user');

        const inputConfirmPassword = screen.getByPlaceholderText(/confirm password/i);
        fireEvent.change(inputConfirmPassword, {target: {value: 'usernotmatch'}});
        expect(inputConfirmPassword.value).toBe('usernotmatch');

        const registerButton = screen.getByTestId('handleregister');
        fireEvent.click(registerButton);
        
        expect(screen.getAllByText(/passwords are not the same/i)).toBeTruthy();
    });

});