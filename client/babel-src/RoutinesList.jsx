import React from 'react';
import $ from 'jquery';
// import axios from 'axios';

const RoutinesList = props => {
	let routines = props.rt;

	React.useEffect(() => {
		props.getRoutines()
	}, [props.routines]);

	let clickHandler = (e) => {
		console.log(e.target.id);

		$.ajax({
			url: '/routine/' + e.target.id,
			method: 'GET',
			data: e.target.id,
			dataType: 'json',
			success: function(data) {
				console.log('Indiv Routine data', data);
			},
			error: function(err) {
				console.log(err);
			}
		})
	};

	return (
		<div className="routines">
			<table>
				<tbody>
					<tr>
						<th>Routines</th>
					</tr>
					{routines.length ? routines.map(routine =>
						<tr key={routine._id}>
							<td>
								<a onClick={clickHandler} id={routine._id} src="#">{routine.name}</a>
							</td>
						</tr>) : <tr></tr>}
				</tbody>
			</table>
		</div>
	)
};

export default RoutinesList;

