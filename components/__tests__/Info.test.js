import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Info from '../../app/auth/info';
import { useRouter } from 'expo-router';

// Mocking useRouter module
jest.mock('expo-router');

describe('Info', () => {
    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<Info />);
        expect(getByText('Let\'s get started')).toBeTruthy();
        expect(getByPlaceholderText('First Name')).toBeTruthy();
    });

    it('submits the form successfully', async () => {
        const mockPush = jest.fn();
        useRouter.mockReturnValue({
            push: mockPush,
        });

        const { getByPlaceholderText, getByText } = render(<Info/>);
        const firstNameInput = getByPlaceholderText('First Name');
        const lastNameInput = getByPlaceholderText('Last Name');
        const dobInput = getByPlaceholderText('yyyy-mm-dd');
        const addressInput = getByPlaceholderText('Enter Address');
        const stateInput = getByPlaceholderText('Enter State');
        const bvnInput = getByPlaceholderText('Enter BVN');
        const proceedButton = getByText('Proceed');

        fireEvent.changeText(firstNameInput, 'John');
        fireEvent.changeText(lastNameInput, 'Doe');
        fireEvent.changeText(dobInput, '1990-01-01');
        fireEvent.changeText(addressInput, '123 Main St');
        fireEvent.changeText(stateInput, 'California');
        fireEvent.changeText(bvnInput, '12345678901');

        fireEvent.press(proceedButton);

        // Wait for the asynchronous code inside onSubmit to finish
        await waitFor(() => {
            // Add your assertions for the expected behavior after form submission
            expect(mockPush).toHaveBeenCalledWith({
                pathname: '/auth/phone',
                params: {
                    infoData: {
                        email: 'test@example.com', // Replace with the actual email value
                        password: 'testpassword', // Replace with the actual password value
                        firstName: 'John',
                        lastName: 'Doe',
                        dateOfBirth: '1990-01-01',
                        state: 'California',
                        address: '123 Main St',
                        bvn: '12345678901',
                    },
                },
            });
            expect(mockPush).toHaveBeenCalledTimes(1);
            // Add more assertions as needed
        });
    });

    // Add more test cases as needed for other functionalities

});
