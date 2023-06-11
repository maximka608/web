import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from '../main';

describe('Main page', () => {

    it('test routes button', () => {
        render(<Router><Main/></Router>);
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

});