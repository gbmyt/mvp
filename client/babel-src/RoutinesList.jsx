import React from 'react';

const RoutinesList = props => {
	let routines = props.rt;
	if(routines.length) {
		// console.log('routines?',  props.rt[0].name);
		console.log('name', routines[0].name);
	}

	React.useEffect(() => {
		props.getRoutines()
	}, [props.routines]);

	return (
		<div className="routines">
			<button onClick={() => { props.getRoutines() }}>Refresh</button>
			<h3>Routines</h3>
			<table>
				<tbody>
					<tr>
						<th>Name</th>
					</tr>
					{routines.length ? routines.map(routine =>  <tr key={routine.name}><td>{routine.name}</td></tr>) : <tr><td></td></tr>}
				</tbody>
			</table>
		</div>
	)
};

export default RoutinesList;

