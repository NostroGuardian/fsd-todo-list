import { createBrowserRouter } from 'react-router-dom';
import { TodoListPage } from 'pages/todoListPage/ui';
import { MainLayout } from 'shared/ui/mainLayout';
import { TodoDetailsPage } from 'pages/todoDetailsPage/ui';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <TodoListPage />,
			},
			{
				path: ':id',
				element: <TodoDetailsPage />,
			},
		],
	},
]);
