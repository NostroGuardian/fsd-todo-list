import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getTodo, getTodoById, updateTodo } from 'shared/api/todos';
import { QueryParams, Todo } from 'shared/api/todos/model';

export interface ITaskState {
	taskList: Todo[];
	task?: Todo;
	isLoading: boolean;
	taskListError?: string;
	taskError?: string;
	isUpdateLoading: boolean;
}

const initialState: ITaskState = {
	taskList: [],
	isLoading: false,
	isUpdateLoading: false,
};

export const getTodoList = createAsyncThunk<Todo[] | undefined, QueryParams>(
	'task/getTodoList',
	async (params: QueryParams) => {
		try {
			const data = await getTodo(params);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
			if (e instanceof Error) {
				throw new Error(`Other type error: ${e}`);
			}
		}
	}
);

export const getTask = createAsyncThunk<Todo | undefined, string>(
	'task/getTask',
	async (id: string) => {
		try {
			const data = await getTodoById(id);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
			if (e instanceof Error) {
				throw new Error(`Other type error: ${e}`);
			}
		}
	}
);

export const updateTask = createAsyncThunk<Todo | undefined, Todo>(
	'task/updateTask',
	async (todo: Todo) => {
		try {
			const data = await updateTodo(todo);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
			if (e instanceof Error) {
				throw new Error(`Other type error: ${e}`);
			}
		}
	}
);

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTodoList.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.taskList = action.payload;
			state.isLoading = false;
		});
		builder.addCase(getTodoList.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getTodoList.rejected, (state, action) => {
			state.isLoading = false;
			state.taskListError = action.error.message;
		});

		builder.addCase(getTask.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.task = action.payload;
			state.isLoading = false;
		});
		builder.addCase(getTask.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getTask.rejected, (state, action) => {
			state.isLoading = false;
			state.taskError = action.error.message;
		});

		builder.addCase(updateTask.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.taskList = state.taskList.map((todo) => {
				return todo.id === action.payload.id ? action.payload : todo;
			});
			state.isUpdateLoading = false;
		});
		builder.addCase(updateTask.pending, (state) => {
			state.isUpdateLoading = true;
		});
		builder.addCase(updateTask.rejected, (state) => {
			state.isUpdateLoading = false;
		});
	},
});

export default taskSlice.reducer;
export const taskActions = taskSlice.actions;
