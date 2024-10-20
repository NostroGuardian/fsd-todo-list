import { useDispatch, useSelector } from 'react-redux';
import { Result, Space, Spin } from 'antd';
import { AppDispatch, RootState } from 'app/store';
import { getTodoList, TaskRow } from 'entities/task';
import { useEffect } from 'react';
import { ToggleTask } from 'features/toggleTask';
import { TaskFilter } from 'features/taskFilter';

export const TodoListPage = () => {
	const { taskList, isLoading, taskListError } = useSelector((s: RootState) => s.task);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getTodoList({}));
	}, [dispatch]);

	if (taskListError) {
		return <Result title={taskListError} />;
	}

	return (
		<Space direction="vertical">
			<TaskFilter onChange={() => dispatch(getTodoList({}))} />
			{isLoading ? (
				<Spin />
			) : Array.isArray(taskList) ? (
				taskList.map((task) => (
					<TaskRow
						key={task.id}
						title={task.title}
						id={task.id}
						action={<ToggleTask todo={task} />}
					/>
				))
			) : (
				<Result title="Не удалось загрузить список задач." />
			)}
		</Space>
	);
};
