import React, { PropTypes, Component } from 'react'

class Profile extends Component {
	render() {
		var data = [
			{id: 1, name: 'Ben', score: 720},
			{id: 2, name: 'Alice', score: 578}
		];
        return (
            <div>
                <div>
                	<div>
                		<h2 style={{display: 'inline'}}>John Smith</h2>
                		<h4 style={{display: 'inline'}}> 318 Total Points</h4>
                	</div>
                	<p>4 files submitted | 18 files commented</p>
                </div>
                <table>
                	<caption>Class Leaderboard</caption>
                	<tbody>
						{
							data.map(function(user) {
								return (
									<tr id={user.id}>
										<td id={user.id}>{user.name}</td>
										<td id={user.id}>{user.score}</td>
									</tr>
								)
							})
						}
                	</tbody>
                </table>
            </div>
        )
    }
};

export default Profile