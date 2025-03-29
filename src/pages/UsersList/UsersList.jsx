import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const UsersList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const result = await axios.get("https://reqres.in/api/users");
			setUsers(result.data);
		};
		fetchUsers();
	}, []);

	const handleEdit = () => {};

	const columns = [
    {
      name: "Image",
      selector: (row) => <img src={row.avatar} alt="" className="w-16 rounded-full my-1" />
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
			<DataTable columns={columns} data={users.data} title="Users" />
		</div>
	);
};

export default UsersList;
