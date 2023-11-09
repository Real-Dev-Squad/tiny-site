import Dashboard from '../../src/pages/dashboard';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('Dashboard Component', () => {
    const mockWriteText = jest.fn();
    global.navigator.clipboard = { writeText: mockWriteText };

    test('renders the Dashboard component with input box and button', () => {
        render(<Dashboard />);
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        const generateButton = screen.getByText('Generate');

        expect(urlInput).toBeInTheDocument();
        expect(generateButton).toBeInTheDocument();
    });

    test('updates input box value when text is entered', () => {
        render(<Dashboard />);
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });
        expect(urlInput.value).toBe('https://www.google.com');
    });

    test.skip('generates and displays short URL on button click', async () => {
        jest.mock('../../src/hooks/isAuthenticated', () => ({
            useIsAuthenticated: () => ({
                isLoggedIn: true,
                userData: { username: 'testUser', Id: 1 },
            }),
        }));

        render(<Dashboard />);

        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });

        const generateButton = screen.getByText('Generate');

        await act(async () => {
            fireEvent.click(generateButton);

            await new Promise((resolve) => setTimeout(resolve, 500));

            const shortUrlInput = screen.queryByPlaceholderText('Copy the URL');
            expect(shortUrlInput).toBeTruthy();
        });

        const toast = screen.queryByTestId('toast');
        expect(toast).toBeNull();
    });

    test.skip('copies short URL to clipboard on Copy button click', async () => {
        jest.mock('../../src/hooks/isAuthenticated', () => ({
            useIsAuthenticated: () => ({
                isLoggedIn: false,
                userData: null,
            }),
        }));
        render(<Dashboard />);
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });

        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);

        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);

        expect(mockWriteText).toHaveBeenCalledWith(expect.any(String));
    });

    test('shows toast message when Copy button is clicked', async () => {
        jest.mock('../../src/hooks/isAuthenticated', () => ({
            useIsAuthenticated: () => ({
                isLoggedIn: false,
                userData: null,
            }),
        }));
        render(<Dashboard />);
        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);
        await screen.findByTestId('toast');
        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();
    });

    test('does not show toast message when Copy button is not clicked', () => {
        render(<Dashboard />);
        const toast = screen.queryByTestId('toast');
        expect(toast).not.toBeInTheDocument();
    });

    test('shows error message when not logged in', () => {
        render(<Dashboard />);
        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);
        const toast = screen.getByTestId('toast');
        expect(toast).toHaveTextContent('Not logged in');
    });
});
