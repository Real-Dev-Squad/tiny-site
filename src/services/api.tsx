import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQuery } from 'react-query';

import { TINY_API_URL, TINY_API_URL_DETAIL } from '@/constants/url';
import { UrlType } from '@/types/url.types';
import { User } from '@/types/user.types';
interface ShortenUrlRequest {
    OriginalUrl: string;
    Comment: string;
    CreatedBy: string;
    UserId: number;
}

interface ShortenUrlResponse {
    shortUrl: string;
}

interface MutationParams {
    originalUrl: string;
    userData: User;
}

export interface ApiError {
    message: string;
    statusCode: number;
    details?: string;
}

const useAuthenticatedQuery = () => {
    return useQuery({
        queryKey: ['useAuthenticatedQuery'],
        queryFn: () =>
            axios
                .get(`${TINY_API_URL}/users/self`, {
                    withCredentials: true,
                })
                .then((res) => res.data),
        retry: false,
        enabled: true,
        staleTime: 60 * 60 * 1000,
    });
};
const useGetOriginalUrlQuery = (shortUrlCode: string, options: { enabled: boolean }) => {
    return useQuery({
        queryKey: ['originalUrl', shortUrlCode],
        queryFn: () => axios.get(`${TINY_API_URL_DETAIL}/${shortUrlCode}`).then((res) => res.data),
        ...options,
        retry: false,
    });
};
const getUrlsApi = async (): Promise<{ message: string; urls: UrlType[] }> => {
    const { data } = await axios.get(`${TINY_API_URL}/urls/self`, {
        withCredentials: true,
    });
    return data;
};
const useGetUrlsQuery = ({ enabled = true }: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['urls'],
        enabled: enabled,
        queryFn: getUrlsApi,
    });
};

type useShortenUrlMutationArgs = {
    onSuccess?: (data: ShortenUrlResponse) => void;
    onError?: (error: AxiosError<ApiError>) => void;
};

const useShortenUrlMutation = ({ onSuccess, onError }: useShortenUrlMutationArgs = {}): UseMutationResult<
    ShortenUrlResponse,
    AxiosError<ApiError>,
    MutationParams
> => {
    return useMutation(
        async ({ originalUrl, userData }: MutationParams) => {
            const response = await axios.post(
                `${TINY_API_URL}/tinyurl`,
                {
                    OriginalUrl: originalUrl,
                    Comment: '',
                    CreatedBy: userData?.data?.userName,
                    UserId: userData?.data?.id,
                } as ShortenUrlRequest,
                {
                    withCredentials: true,
                }
            );
            return response.data as ShortenUrlResponse;
        },
        {
            retry: false,
            onSuccess,
            onError,
        }
    );
};
const deleteUrlApi = async ({ id, userId }: { id: number; userId: number }) => {
    const { data } = await axios.delete(`${TINY_API_URL}/urls/${id}`, {
        withCredentials: true,
        data: { user_id: userId },
    });
    return data;
};
export { deleteUrlApi, useAuthenticatedQuery, useGetOriginalUrlQuery, useGetUrlsQuery, useShortenUrlMutation };
