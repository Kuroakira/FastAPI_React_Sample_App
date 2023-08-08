import axios from "axios";
import { useAppDispatch } from '../app/hooks';
import { useQueryClient, useMutation } from "react-query";
import { resetEditedTask, toggleCsrfState } from "../slices/appSlice";
import { Task } from "../types/types";
import { useNavigate } from 'react-router-dom';
import { taskCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";

export const useMutateTask = () => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const createTaskMutation = useMutation((task: Omit<Task, 'id'>) =>
        axios.post<Task>("api/todo", task, {
            withCredentials: true
        }),
        {
            onSuccess: (res) => {
                const previousTodos = queryClient.getQueryData<Task[]>('tasks');
                if (previousTodos) {
                    queryClient.setQueryData('tasks', [...previousTodos, res.data])
                }
                dispatch(resetEditedTask())
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`);
                if (
                    err.response.data.detail === 'The JWT has expired' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    dispatch(toggleCsrfState());
                    dispatch(resetEditedTask());
                    nav('/');
                }
            }
        }
    );
    
    const updateTaskMutation = useMutation(
        (task: Task) =>
            axios.put<Task>(`api/todo/${task.id}`,
                {
                    title: task.title,
                    description: task.description,
                },
                {
                    withCredentials: true
                }
            ),
        {
            onSuccess: (res, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>('tasks');
                if (previousTodos) {
                    queryClient.setQueryData<Task[]>(
                        'tasks',
                        previousTodos.map((task) =>
                            task.id === variables.id ? res.data : task
                        )
                    )
                }
                dispatch(resetEditedTask());
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`);
                if (
                    err.response.data.detail === 'The JWT has expired' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    dispatch(toggleCsrfState());
                    dispatch(resetEditedTask());
                    nav("/");
                }
            }
        }
    )
    const deleteTaskMutation = useMutation(
        (id: string) =>
            axios.delete(`api/todo/${id}`, {
                withCredentials: true,
            }),
        {
            onSuccess: (res, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>('tasks');
                if (previousTodos) {
                    queryClient.setQueryData<Task[]>(
                        'tasks',
                        previousTodos.filter((task) => task.id !== variables)
                    )
                }
                dispatch(resetEditedTask());
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`);
                if (
                    err.response.data.detail === 'The JWT has expired' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    dispatch(toggleCsrfState());
                    dispatch(resetEditedTask());
                    nav("/");
                }
            }
        }
    )
    return {
        createTaskMutation,
        updateTaskMutation,
        deleteTaskMutation
    }
}