import { act, renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import useAuthenticated from '@/hooks/useAuthenticated';

import user from '../../__mocks__/db/user';

describe('useAuthenticated', () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('returns isLoggedIn as false and userData as undefined by default', () => {
        const { result } = renderHook(() => useAuthenticated(), { wrapper });

        expect(result.current.isLoggedIn).toBe(false);
        expect(result.current.userData).toBe(undefined);
    });

    it('returns isLoggedIn as true and userData as user data when user is logged in', async () => {
        const { result, waitFor } = renderHook(() => useAuthenticated(), { wrapper });

        await act(async () => {
            await queryClient.setQueryData('user', user);
        });

        await waitFor(() => result.current.isLoggedIn);

        expect(result.current.isLoggedIn).toBe(true);
        expect(result.current.userData).toEqual(user);
    });
});
