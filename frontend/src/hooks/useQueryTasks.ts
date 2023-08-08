import axios from "axios";
import { useQuery } from "react-query";
import { Task } from '../types/types';

export const useQueryTasks = () => {
    const getTasks = async () => {
        const { data } = await axios.get<Task[]> (
            'api/todo',
            {
                withCredentials: true,
            }
        )
        return data;
    }

    return useQuery<Task[], Error>(['tasks'], getTasks, {staleTime: Infinity});
}