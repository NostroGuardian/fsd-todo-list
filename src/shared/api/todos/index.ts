import { httpClient } from '../httpClient';
import { QueryParams, Todo } from './model';

const SLUG = 'todos';

export const getTodo = (params: QueryParams): Promise<Todo[]> => {
	return httpClient.get<Todo[]>(SLUG, { params: params }).then((res) => res.data);
};

export const getTodoById = (id: string): Promise<Todo> => {
	return httpClient.get<Todo>(`${SLUG}/${id}`).then((res) => res.data);
};

export const updateTodo = (todo: Todo): Promise<Todo> => {
	return httpClient.put<Todo>(`${SLUG}/${todo.id}`, todo).then((res) => res.data);
};
