/* eslint-disable testing-library/no-unnecessary-act */
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

describe('Profile page', () => {

    let token = { 'token': 'dGVzdDp0ZXN0' };
    let id = { 'id': 7 };

    const dataUser = {
        name: 'user',
        email: 'user@gmail.com',
        password: 'user',
    };

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
    
    it('test profile page', async () => {
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(JSON.stringify(new Response(successResponse))));
            render(<Router><Profile/></Router>);
        });

        expect(screen.getByText(/my profile/i)).toBeTruthy();

        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton);
        render(<Router><EditUser/></Router>);
        expect(screen.getAllByText(/save/i)).toBeTruthy();

        render(<Router><Profile/></Router>);
        const logoutButton = screen.getAllByTestId("logout");
        fireEvent.click(logoutButton[0]);
        render(<Router><Login/></Router>);
        expect(screen.getAllByText(/log in/i)).toBeTruthy();

        render(<Router><Profile/></Router>);
        const deleteButton = screen.getAllByTestId("delete-button");
        fireEvent.click(deleteButton[0]);
        expect(screen.getAllByText("Are you shure you want to delete your account? You will not be able to restore it.")).toBeTruthy();

        const closeButton = screen.getAllByTestId("close-icon");
        fireEvent.click(closeButton[0]);
        
    });

    it('renders profile page', async () => {
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            render(<Router><Profile/></Router>);
        });

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(dataUser),
            status: 200,
          });

        const element = screen.getByText(/user/i);
        expect(element).toBeInTheDocument()
    });

    it('delete account', async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(new Response(successResponse)) }));
            render(<Router><Profile/></Router>);
        });

        const deleteButton = screen.getAllByTestId("delete-button");
        fireEvent.click(deleteButton[0]);
        expect(screen.getAllByText("Are you shure you want to delete your account? You will not be able to restore it.")).toBeTruthy();

        await fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(new Response(successResponse)) }));
        const deleteHandler = screen.getByTestId("handledelete");
        fireEvent.click(deleteHandler);

        await expect(fetch)
        .toHaveBeenCalledTimes(2);

        render(<Router><Login/></Router>);
        expect(screen.getAllByText(/log in/i)).toBeTruthy();

    });

});