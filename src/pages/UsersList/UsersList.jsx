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
			name: "Edit",
			cell: (row) => (
				<button
					className="cursor-pointer px-1.5 py-0.5 bg-neutral-300 rounded hover:bg-neutral-100 transition-all duration-200"
					onClick={() => handleEdit(row)}
				>
					Edit
				</button>
			),
		},
		{
			name: "Delete",
			cell: (row) => (
				<button
					className="cursor-pointer px-1.5 py-0.5 bg-neutral-300 rounded hover:bg-neutral-100 transition-all duration-200"
					onClick={() => document.getElementById("my_modal_5").showModal()}
				>
					Delete
				</button>
			),
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
			<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Hello!</h3>
					<p className="py-4">
						Press ESC key or click the button below to close
					</p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default UsersList;
