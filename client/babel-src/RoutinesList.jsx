import React from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';


const RoutinesList = props => {
	let routines = props.rt;
	let navigate = useNavigate();

	React.useEffect(() => {
		props.getRoutines()
	}, [props.routines]);

	let clickHandler = (e) => {
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

		navigate(`/routine/${e.target.id}`);
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
								<a onClick={clickHandler} id={routine._id}>{routine.name}</a>
							</td>
						</tr>) : <tr></tr>}
				</tbody>
			</table>
		</div>
	)
};

export default RoutinesList;

