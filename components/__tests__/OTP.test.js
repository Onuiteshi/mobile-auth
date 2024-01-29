import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Otp from '../../app/auth/otp';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Mocking useRouter and useLocalSearchParams modules
jest.mock('expo-router');
jest.mock('expo-router', () => ({
    ...jest.requireActual('expo-router'),
    useRouter: jest.fn(),
}));
jest.mock('expo-router', () => ({
    ...jest.requireActual('expo-router'),
    useLocalSearchParams: jest.fn(),
}));

describe('Otp', () => {
    it('renders correctly', () => {
        const mockUseLocalSearchParams = jest.fn();
        useLocalSearchParams.mockReturnValue({
            email: 'test@example.com',
        });

        const { getByText, getByPlaceholderText } = render(<Otp />);
        expect(getByText('Enter OTP Code')).toBeTruthy();
        expect(getByPlaceholderText('******')).toBeTruthy();
    });

    it('submits the OTP form successfully', async () => {
        const mockPush = jest.fn();
        const mockUseLocalSearchParams = jest.fn();
        useRouter.mockReturnValue({
            push: mockPush,
        });
        useLocalSearchParams.mockReturnValue({
            email: 'test@example.com',
        });

        const { getByPlaceholderText, getByText } = render(<Otp />);
        const otpInput = getByPlaceholderText('******');
        const proceedButton = getByText('Proceed');

        fireEvent.changeText(otpInput, '123456');

        fireEvent.press(proceedButton);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith({ pathname: '/auth/password', params: { email: 'test@example.com' } });
            expect(mockPush).toHaveBeenCalledTimes(1);
        });
    });

    it('displays error when OTP is not provided', async () => {
        const { getByText } = render(<Otp />);
        const proceedButton = getByText('Proceed');

        fireEvent.press(proceedButton);

        await waitFor(() => {
            expect(getByText('OTP is required.')).toBeTruthy();
        });
    });


});
