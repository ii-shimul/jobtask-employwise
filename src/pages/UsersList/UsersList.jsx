import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const UsersList = () => {
	const [users, setUsers] = useState({ data: [], total: 0 });
	const [page, setPage] = useState(1);
	const [userEdit, setUserEdit] = useState([]);

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

	if (!users.data.length)
		return <p className="text-center text-3xl">Loading...</p>;

	const handleEdit = async (e, user) => {
		e.preventDefault();
		const firstName = e.target.first_name.value;
		const lastName = e.target.last_name.value;
		const email = e.target.email.value;
		const result = await axios.put(`https://reqres.in/api/users/${user.id}`, {
			first_name: firstName, 
			last_name: lastName, 
			email: email,
		});

		if (result.status === 200) {
			alert("Success!");
      e.target.reset()
      document.getElementById("my_modal_5").close();
		} else {
      e.target.reset();
			document.getElementById("my_modal_5").close();
			alert("Something went wrong!");
		}
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
					onClick={() => {
						document.getElementById("my_modal_5").showModal();
						setUserEdit(row);
					}}
				>
					Edit
				</button>
			),
		},
		{
			name: "Delete",
			cell: (row) => (
				<button className="cursor-pointer px-1.5 py-0.5 bg-red-300 rounded hover:bg-red-100 transition-all duration-200">
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
			<dialog id="my_modal_5" className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<form
						onSubmit={(e) => handleEdit(e, userEdit)}
						className="flex flex-col items-center justify-center"
					>
						<fieldset className="fieldset w-full">
							<legend className="fieldset-legend">First Name</legend>
							<input
								type="text"
								name="first_name"
								className="input w-full"
								placeholder="Type here"
								defaultValue={userEdit.first_name}
							/>
						</fieldset>
						<fieldset className="fieldset w-full">
							<legend className="fieldset-legend">Last Name</legend>
							<input
								type="text"
								name="last_name"
								className="input w-full"
								placeholder="Type here"
								defaultValue={userEdit.last_name}
							/>
						</fieldset>
						<fieldset className="fieldset w-full">
							<legend className="fieldset-legend">Email</legend>
							<input
								type="email"
								name="email"
								className="input w-full"
								placeholder="Type here"
								defaultValue={userEdit.email}
							/>
						</fieldset>
						<button type="submit" className="btn btn-neutral mt-2 btn-wide">
							Submit
						</button>
					</form>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
};

export default UsersList;
