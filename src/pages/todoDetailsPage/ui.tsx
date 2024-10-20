import { Result, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'app/store';
import { getTask, TaskCard } from 'entities/task';
import { ToggleTask } from 'features/toggleTask';

export const TodoDetailsPage = () => {
	const { isLoading, task, taskError } = useSelector((s: RootState) => s.task);
	const dispatch = useDispatch<AppDispatch>();

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			dispatch(getTask(id));
		}
	}, [id, dispatch]);

	return (
		<Row justify="center" align="middle">
			{taskError ? (
				<Result title={taskError} />
			) : (
				<TaskCard
					title={`Task#${task?.id}`}
					text={task?.title || ''}
					loading={isLoading}
					actions={task ? [<ToggleTask todo={task} />] : undefined}
				/>
			)}
		</Row>
	);
};
