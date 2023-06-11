import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from '../login';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
const successResponse = 'Logged In';

describe('Login page', () => {

    it('renders login form', () => {
        render(<Router><Login/></Router>);
        expect(screen.getByTestId("login-form"))
            .toBeInTheDocument();

        const inputName = screen.getByPlaceholderText(/username/i);
        fireEvent.change(inputName, {target: {value: 'user'}});
        expect(inputName.value).toBe('user');
          
        const inputPassword = screen.getByPlaceholderText(/password/i);
        fireEvent.change(inputPassword, {target: {value: 'user'}});
        expect(inputPassword.value).toBe('user');
    });

    it('test routes button', () => {
        render(<Router><Login/></Router>);
        const signButton = screen.getByTestId("change-sign-button");
        fireEvent.click(signButton);
        expect(screen.getAllByText(/sign up/i)).toBeTruthy();

        const loginButton = screen.getByTestId("change-login-button");
        fireEvent.click(loginButton);
        expect(screen.getAllByText(/log in/i)).toBeTruthy();

        const mainButton = screen.getByTestId("change-main-button");
        fireEvent.click(mainButton);
        expect(screen.getAllByText(/NoteMe/i)).toBeTruthy();
    })

    it('tests user login', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            render(<Router><Login/></Router>);
        });
        const submitBtn = screen.getByTestId('handlelogin');
        fireEvent.click(submitBtn);

        const headers = new Headers();
        headers.set('content-type', 'application/json');
        expect(fetch)
            .toHaveBeenCalledWith('http://127.0.0.1:5000/user/login', {
                'body': '{"username":"","password":""}',
                'headers': headers,
                'method': 'POST'
            });

        await expect(fetch)
            .toHaveBeenCalledTimes(1);
    });

   
});