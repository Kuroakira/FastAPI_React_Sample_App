import axios from "axios";
import { useQuery } from "react-query";
import { UserInfo } from '../types/types';
import { useNavigate } from "react-router-dom"

export const useQueryUser = () => {
    const nav = useNavigate();
    const getCurrentUser = async () => {
        const { data } = await axios.get<UserInfo>(
            "api/user",
            {
                withCredentials: true,
            }
        )
        return data;
    }

    return useQuery<UserInfo, Error>(
        ['user'], 
        getCurrentUser, 
        {
            staleTime: Infinity,
            onError: (error) => nav("/")
        });
}