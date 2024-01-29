import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signup from './Signup';
import axios from 'axios';

// Mocking axios module
jest.mock('axios');

describe('Signup', () => {
    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<Signup />);

        expect(getByText('Sign up')).toBeTruthy();
        expect(getByPlaceholderText('Enter your email address')).toBeTruthy();
    });

    it('submits the form successfully', async () => {
        axios.get.mockResolvedValue({ data: { statusCode: 200 } });

        const { getByPlaceholderText, getByText } = render(<Signup />);
        const emailInput = getByPlaceholderText('Enter your email address');
        const proceedButton = getByText('Proceed');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.press(proceedButton);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                'https://cardex.live/api/email/send/verification-code?email=test@example.com'
            );
            expect(axios.get).toHaveBeenCalledTimes(1);
        });
    });


});
