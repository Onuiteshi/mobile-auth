import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnboardingScreen from '../../app/(onboarding)/index';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

describe('OnboardingScreen', () => {
    it('renders correctly', () => {
        const { getByText } = render(<OnboardingScreen />);
        expect(getByText('Skip')).toBeTruthy();
        expect(getByText('Gift Cards')).toBeTruthy();
    });

    it('handles skip button click', () => {
        const { getByText } = render(<OnboardingScreen />);
        const skipButton = getByText('Skip');

        fireEvent.press(skipButton);
    });

});
