import React, {useMemo} from 'react';

function ResidentsList({items}) {
	const studentList = useMemo(() => {
		return items.studentData.map((student, index) => {
			return <li key={index} className="slide-up-fade-in">
			{student.name}
		</li>
		})
	}, [items.studentData])

	return (
		<div className="pa-10 mt-10 w-75">
			<div className="font-weight-bold text-center">Residents List</div>
			<ul className="mt-10 styled w-50 mx-auto" data-testid="residentsNameList">
				{studentList}
			</ul>
		</div>
	);
}

export default ResidentsList;
