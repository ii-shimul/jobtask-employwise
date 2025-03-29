import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const UsersList = () => {
	const [users, setUsers] = useState({ data: [], total: 0 });
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const result = await axios.get(
					`https://reqres.in/api/users?page=${page}`
				);
				setUsers(result.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};
		fetchUsers();
	}, [page]);

	if (!users.data.length) return <p className="text-center text-3xl">Loading...</p>;

	const handleEdit = (row) => {
		console.log("Editing user:", row);
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	const columns = [
		{
			name: "Image",
			selector: (row) => (
				<img src={row.avatar} alt="" className="w-16 rounded-full my-1" />
			),
		},
		{
			name: "Name",
			selector: (row) => `${row.first_name} ${row.last_name}`,
			sortable: true,
		},
		{ name: "Email", selector: (row) => row.email },
		{
			name: "Actions",
			cell: (row) => <button onClick={() => handleEdit(row)}>Edit</button>,
		},
	];

	return (
		<div className="w-full">
			<DataTable
				columns={columns}
				data={users.data}
				title="Users"
				pagination
				paginationServer
				paginationPerPage={6}
				paginationTotalRows={users.total}
				onChangePage={handlePageChange}
			/>
		</div>
	);
};

export default UsersList;
