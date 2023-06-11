import { render, screen, fireEvent, act} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyNotes from '../mynotes';
import Login from '../login';

describe('My Notes page', () => {
    it('test my notes page', () => {
      render(<Router><MyNotes/></Router>);
      expect(screen.getAllByText(/My Notes/i)).toBeTruthy();
  
      const title = screen.getAllByTestId("title");
      act(() => {
        fireEvent.change(title[0], {target: {value: 'titlechanged'}});
      });
      expect(title[0].value).toBe('titlechanged');
  
      const description = screen.getAllByTestId("description");
      act(() => {
        fireEvent.change(description[0], {target: {value: 'descriptionchanged'}});
      });
      expect(description[0].value).toBe('descriptionchanged');
  
      const logoutButton = screen.getAllByTestId("logout");
      fireEvent.click(logoutButton[0]);
  
      render(<Router><Login/></Router>);
      expect(screen.getAllByText(/log in/i)).toBeTruthy();
    });
  });
  