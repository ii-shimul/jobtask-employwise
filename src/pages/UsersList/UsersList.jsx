import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";

const UsersList = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(1);
	const [userEdit, setUserEdit] = useState([]);
	const [userDelete, setUserDelete] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");

	// load users
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const result = await axios.get(
					`https://reqres.in/api/users?page=${page}`
				);
				setUsers(result.data.data);
				setTotalUsers(result.data.total);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};
		fetchUsers();
	}, [page]);

	// return loading message if users not loaded yet
	if (!users.length) {
		return <p className="text-center text-3xl">Loading...</p>;
	}

	// filter users based on the search query
	const filteredUsers = users.filter((user) =>
		`${user.first_name} ${user.last_name} ${user.email}`
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	// function for editing users
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
			toast.success("Edited Successfully!");
			const updatedUser = {
				...userEdit,
				first_name: firstName,
				last_name: lastName,
				email: email,
			};
			setUsers(
				users.map((user) =>
					user.id === userEdit.id ? { ...user, ...updatedUser } : user
				)
			);
		} else {
			toast.error("Something went wrong!");
		}
		e.target.reset();
		document.getElementById("my_modal_5").close();
	};

	// function for deleting users
	const handleDelete = async () => {
		const result = await axios.delete(
			`https://reqres.in/api/users/${userDelete.id}`
		);
		if (result.status === 204) {
			toast.success("Success!");
			const newUsers = users.filter((user) => user.id !== userDelete.id);
			setUsers(newUsers);
			setTotalUsers((prev) => prev - 1);
		} else {
			toast.error("Something went wrong!");
		}
		document.getElementById("my_modal_4").close();
	};

	// change page number for pagination
	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	// define columns for the data table
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
						setUserEdit(row);
						document.getElementById("my_modal_5").showModal();
					}}
				>
					Edit
				</button>
			),
		},
		{
			name: "Delete",
			cell: (row) => (
				<button
					onClick={() => {
						setUserDelete(row);
						document.getElementById("my_modal_4").showModal();
					}}
					className="cursor-pointer px-1.5 py-0.5 bg-red-300 rounded hover:bg-red-100 transition-all duration-200"
				>
					Delete
				</button>
			),
		},
	];

	return (
		<div className="w-full">
			{/* Search Input */}
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search by name or email"
					className="input input-bordered w-full"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<DataTable
				columns={columns}
				data={filteredUsers}
				title="Users"
				pagination
				paginationServer
				paginationPerPage={6}
				paginationTotalRows={totalUsers}
				onChangePage={handlePageChange}
				highlightOnHover
			/>

			{/* edit form modal */}
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

			{/* delete confirmation modal */}
			<dialog id="my_modal_4" className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<div>
						<h1>Do you really want to delete the user?</h1>
						<div className="modal-action">
							<button onClick={handleDelete} className="btn btn-warning">
								Confirm
							</button>
							<form method="dialog">
								<button className="btn">Cancel</button>
							</form>
						</div>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
};

export default UsersList;
