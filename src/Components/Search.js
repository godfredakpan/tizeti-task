import React, { useState } from 'react';
import { STUDENTS } from '../studentsList';
import Error from './Error';
import ResidentsList from './ResidentsList';

function checkStudent(studentName) {
	return STUDENTS.filter(student => student.name.toLowerCase() === studentName.toLowerCase());
}

function checkValidity(joiningDate, validityDate) {
	if (joiningDate && validityDate) {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const [year, month, day] = joiningDate.split('-');
		const [yyyy, mm, dd] = validityDate.split('-');
		const maxValid = new Date(yyyy, mm - 1, dd);
		const selected = new Date(year, month - 1, day);
		return (maxValid >= selected) && (maxValid >= today);
	} else {
		return false;
	}
}

function Search() {
	const [items, setItems] = useState({
		error: '',
		studentName: '',
		studentData: [],
	});
	const [studentData, setStudentData] = useState({
		name: '',
		joiningDate: '',
	});

	const handleStudentQuery = (e) => {
		if (studentData.name && studentData.joiningDate) {
			const student = checkStudent(studentData.name);
			if (student.length === 0) {
				setItems({ ...items, error: `Sorry, ${studentData.name} is not a verified student!` });
				return;
			} else {
				setItems({ ...items, error: '' });
			}

			if (!checkValidity(studentData.joiningDate, student[0].validityDate)) {
				setItems({ ...items, error: `Sorry, ${student[0].name}'s validity has Expired!` });
				return;
			} else {
				setItems({ ...items, error: '' });

			}

			if (!items.studentData.some(student => student.name === studentData.name)) {
				setItems({ ...items, studentData: [...items.studentData, studentData] });
			}

			setStudentData({ ...studentData, name: '', joiningDate: '' });
		}

		else {
			setItems({ ...items, error: 'Please enter name or joining date' });
		}

	};

	const handleOnChange = (e) => {
		handleOnFocus();
		const { name, value } = e.target;
		setStudentData({ ...studentData, [name]: value });
	};

	const handleOnFocus = () => {
		setItems({ ...items, error: '' });
	};


	return (
		<>
			<div className="my-50 layout-row align-items-end justify-content-end">
				<label htmlFor="studentName">Student Name:
					<div>
						<input id="studentName" name='name' onChange={handleOnChange} value={studentData.name} data-testid="studentName" type="text" className="mr-30 mt-10" />
					</div>
				</label>
				<label htmlFor="joiningDate">Joining Date:
					<div>
						<input id="joiningDate" name='joiningDate' onChange={handleOnChange} value={studentData.joiningDate} data-testid="joiningDate" type="date" className="mr-30 mt-10" />
					</div>
				</label>

				<button type="button" onClick={handleStudentQuery} data-testid="addBtn" className="small mb-0">Add</button>
			</div>

			<Error items={items} />
			<ResidentsList items={items} />
		</>
	);
}



export default Search;
