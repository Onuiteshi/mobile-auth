import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../../app/auth/login';
import { useRouter } from 'expo-router';

// Mocking useRouter module
jest.mock('expo-router');

describe('Login', () => {
    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<Login />);
        expect(getByText('Log in')).toBeTruthy();
        expect(getByPlaceholderText('Enter your email address')).toBeTruthy();
        expect(getByPlaceholderText('Enter Password')).toBeTruthy();
    });

    it('submits the form successfully', async () => {
        const mockPush = jest.fn();
        useRouter.mockReturnValue({
            push: mockPush,
        });

        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText('Enter your email address');
        const passwordInput = getByPlaceholderText('Enter Password');
        const proceedButton = getByText('Proceed');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'testpassword');

        fireEvent.press(proceedButton);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('(tabs)');
            expect(mockPush).toHaveBeenCalledTimes(1);
        });
    });

    it('displays error when email is not provided', async () => {
        const { getByText } = render(<Login />);
        const proceedButton = getByText('Proceed');

        fireEvent.press(proceedButton);

        await waitFor(() => {
            expect(getByText('This is required.')).toBeTruthy();
        });
    });

    it('displays error when password is not provided', async () => {
        const { getByText } = render(<Login />);
        const proceedButton = getByText('Proceed');

        fireEvent.press(proceedButton);

        await waitFor(() => {
            expect(getByText('Password is required.')).toBeTruthy();
        });
    });


});
