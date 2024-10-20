import { Checkbox, Spin } from 'antd';
import { AppDispatch, RootState } from 'app/store';
import { updateTask } from 'entities/task';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from 'shared/api/todos/model';

type Props = {
	todo: Todo;
};

export const ToggleTask = ({ todo }: Props) => {
	const { isUpdateLoading } = useSelector((s: RootState) => s.task);
	const dispatch = useDispatch<AppDispatch>();

	return isUpdateLoading ? (
		<Spin />
	) : (
		<Checkbox
			checked={todo.completed}
			onChange={(value) =>
				dispatch(updateTask({ ...todo, completed: value.target.checked }))
			}
		/>
	);
};
