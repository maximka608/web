
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../home';
import Login from '../login';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
const successResponse = 200;

describe('Home page', () => {

    let token = { 'token': 'dGVzdDp0ZXN0' };
    let id = { 'id': 7 };

    const dataNote = [
        {
            id: 5,
            idOwner: 7,
            idTag: 1,
            name: 'note',
            text: 'my first note on the service',
        },
    ];

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
    
    test('home page without notes', async() => {
    
        jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue([]),
        status: 200,
      })

      render(<Router><Home/></Router>);
      const element = screen.getByText(/No note was added/i);
      expect(element).toBeInTheDocument();

      expect(screen.getByText(/Good Day/i)).toBeTruthy();

      const logoutButton = screen.getAllByTestId("logout");
      fireEvent.click(logoutButton[0]);
      render(<Router><Login/></Router>);
      expect(screen.getAllByText(/log in/i)).toBeTruthy();
      
    });

    it('renders home page', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            render(<Router><Home/></Router>);
        });

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(dataNote),
            status: 200,
          });

          await expect(fetch)
          .toHaveBeenCalledTimes(1);
    });

    it('get note home page', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            render(<Router><Home/></Router>);
        });

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(dataNote),
            status: 200,
          });

        const inputName = screen.getByTestId("findnote");
        fireEvent.change(inputName, {target: {value: 'note'}});
        expect(inputName.value).toBe('note');

        await fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(new Response(successResponse)) }));
        await expect(fetch)
        .toHaveBeenCalledTimes(2);
    });


});