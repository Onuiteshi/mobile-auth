import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Onboarding from '../../app/(onboarding)/onboarding';
import { Link } from 'expo-router';

jest.mock('expo-router', () => ({
    Link: jest.fn(),
}));

describe('Onboarding', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Onboarding />);

        expect(getByText('Create Account')).toBeTruthy();
        expect(getByText('Log In')).toBeTruthy();
    });

    it('navigates to signup page when "Create Account" is pressed', () => {
        const { getByText } = render(<Onboarding />);
        const createAccountButton = getByText('Create Account');

        fireEvent.press(createAccountButton);
        expect(Link).toHaveBeenCalledWith({ href: '/auth/signup', asChild: true });
    });

    it('navigates to login page when "Log In" is pressed', () => {
        const { getByText } = render(<Onboarding />);
        const logInButton = getByText('Log In');

        fireEvent.press(logInButton);

        expect(Link).toHaveBeenCalledWith({ href: '/auth/login', asChild: true });
    });


});
