
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../profile';
import Login from '../login';
import EditUser from '../edituser';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
const successResponse = 200;
const failResponse = 'Passwords are not the same';

describe('Edituser page', () => {

    let token = { 'token': 'dGVzdDp0ZXN0' };
    let id = { 'id': 7 };

    beforeAll(() => {
        global.Storage.prototype.setItem = jest.fn((key, value) => {
            token[key] = value;
        });
        global.Storage.prototype.setItem = jest.fn((key, value) => {
            id[key] = value;
        });
        global.Storage.prototype.getItem = jest.fn((key) => token[key]);
        global.Storage.prototype.getItem = jest.fn((key) => id[key]);
    });

    afterAll(() => {
        global.Storage.prototype.setItem.mockReset();
        global.Storage.prototype.getItem.mockReset();
    });
    

    it('test edituser page', async () => {
        render(<Router><EditUser/></Router>);
        expect(screen.getByText(/password credentials/i)).toBeTruthy();

        const inputName = screen.getByPlaceholderText(/username/i);
        fireEvent.change(inputName, {target: {value: 'user'}});
        expect(inputName.value).toBe('user');

        const inputEmail = screen.getByPlaceholderText(/email/i);
        fireEvent.change(inputEmail, {target: {value: 'user@gmail.com'}});
        expect(inputEmail.value).toBe('user@gmail.com');
        
        const inputPassword = screen.getByPlaceholderText("password");
        fireEvent.change(inputPassword, {target: {value: 'user'}});
        expect(inputPassword.value).toBe('user');

        const inputConfirmPassword = screen.getByPlaceholderText(/confirm password/i);
        fireEvent.change(inputConfirmPassword, {target: {value: 'user'}});
        expect(inputConfirmPassword.value).toBe('user');

        const discardButton = screen.getByTestId("discard-button");
        fireEvent.click(discardButton);
        expect(screen.getAllByText(/Are you shure you want to discard changes/i)).toBeTruthy();

        const closeButton = screen.getAllByTestId("close-icon");
        fireEvent.click(closeButton[0]);

        render(<Router><EditUser/></Router>);
        const logoutButton = screen.getAllByTestId("logout");
        fireEvent.click(logoutButton[0]);

        render(<Router><Login/></Router>);
        expect(screen.getAllByText(/log in/i)).toBeTruthy();
    })

    it('registers user with passwords dont match', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(failResponse)));
            render(<Router><EditUser/></Router>);
        });

        render(<Router><EditUser/></Router>);
        const inputPassword = screen.getAllByPlaceholderText("password");
        fireEvent.change(inputPassword[0], {target: {value: 'user'}});
        expect(inputPassword[0].value).toBe('user');

        const inputConfirmPassword = screen.getAllByPlaceholderText(/confirm password/i);
        fireEvent.change(inputConfirmPassword[0], {target: {value: 'usernotmatch'}});
        expect(inputConfirmPassword[0].value).toBe('usernotmatch');

        const changeButton = screen.getAllByTestId('handlechange');
        fireEvent.click(changeButton[0]);
        
        expect(screen.getAllByText(/passwords are not the same/i)).toBeTruthy();
    });

    it('test discard changes', async() => {
    
        render(<Router><EditUser/></Router>);

        const discardChanges = screen.getAllByTestId("discard-changes");
        fireEvent.click(discardChanges[0]);

       
        await act(async () => {
            
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
                

            
        });

        
    });

    it('test edit user', async() => {
        render(<Router><EditUser/></Router>);

        const inputName = screen.getByPlaceholderText(/username/i);
        fireEvent.change(inputName, {target: {value: 'userchanged'}});
        expect(inputName.value).toBe('userchanged');        

        await fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(new Response(successResponse)) }));
        const changeButton = screen.getAllByTestId('handlechange');
        fireEvent.click(changeButton[0]);

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            // render(<Router><Profile/></Router>);
        });

        // expect(screen.getAllByText(/my profile/i)).toBeTruthy();
        // await expect(fetch).toHaveBeenCalledTimes(3);
    });

});
