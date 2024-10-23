import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import axios from "axios"; // Import Axios for making API requests
import "../styles/home.css"; 

const Home = () => {
  
  const [players, setPlayers] = useState([]); // Players available for selection
  const [team, setTeam] = useState([]); // Current fantasy team
  const [teamName, setTeamName] = useState(""); 
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [teams, setTeams] = useState([]); // Created teams
  const [searchQuery, setSearchQuery] = useState(""); // Search query for teams
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); 
  const [loadingPlayers, setLoadingPlayers] = useState(true); 
  const [loadingTeams, setLoadingTeams] = useState(true); 

  // Fetch available players from the server
  const fetchPlayers = async () => {
    try {
      const response = await axios.get("https://assignment-game-hgzr.onrender.com/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
      setErrorMessage("Failed to fetch players. Please try again later."); // Set error message
    } finally {
      setLoadingPlayers(false); // Set loading state to false
    }
  };

  // Fetch created teams from the server
  const fetchTeams = async () => {
    try {
      const response = await axios.get("https://assignment-game-hgzr.onrender.com/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setErrorMessage("Failed to fetch teams. Please try again later."); 
    } finally {
      setLoadingTeams(false); 
    }
  };

  // Fetch players and teams on component mount
  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  // Add selected player to the current team
  const addPlayerToTeam = (player) => {
    if (team.includes(player._id)) {
      setModalMessage(`Player ${player.name} is already part of your team.`); // Set modal message
      setShowModal(true); // Show modal
      return;
    }

    if (player.team) {
      setModalMessage(`Player ${player.name} is already part of another team.`); 
      setShowModal(true); 
      return;
    }

    // Add player to team if under the limit
    if (team.length < 11) {
      setTeam((prevTeam) => [...prevTeam, player._id]); // Add player to team
    } else {
      alert("You can only add a maximum of 11 players to your team!");
    }
  };

  // Handle the "Create Team" button click
  const handleCreateTeamClick = () => {
    // Check if the team has valid number of players
    if (team.length >= 1 && team.length <= 11) {
      setIsFormVisible(true); 
    } else {
      alert("Please add between 1 and 11 players to your team."); 
    }
  };

  // Create a new team
  const createTeam = async () => {
    // Check if the team has valid number of players
    if (team.length < 1 || team.length > 11) {
      alert("A team must have between 1 and 11 players."); 
      return;
    }

    try {
      const response = await axios.post("https://assignment-game-hgzr.onrender.com/teams", {
        name: teamName,
        playerIds: team,
      });

      alert("Team created successfully!"); 
      setTeam([]); // Reset team state
      setTeamName(""); // Reset team name
      setIsFormVisible(false); // Hide team creation form
      fetchTeams();
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Error creating team: " + (error.response?.data?.message || error.message));
    }
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false); 
  };

  // Filter teams based on the search query
  const filteredTeams = teams.filter((team) => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    team._id.includes(searchQuery)
  );

  return (
    <div className="home-container">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{modalMessage}</p> 
          </div>
        </div>
      )}
      <h1>Available Players</h1>
      {loadingPlayers ? (
        <p>Loading players...</p>
      ) : (
        <div className="players-list">
          {players.map((player) => (
            <div className="player-card" key={player._id} onClick={() => addPlayerToTeam(player)}>
              <h3>{player.name}</h3>
              <p>Points: {player.points}</p>
              <p>Position: {player.position}</p>
            </div>
          ))}
        </div>
      )}
      <h2>Your Fantasy Team</h2>
      <div className="team-list">
        {team.map((playerId) => {
          const player = players.find((p) => p._id === playerId);
          return (
            player && (
              <div className="player-card" key={player._id}>
                <h3>{player.name}</h3>
                <p>Points: {player.points}</p>
                <p>Position: {player.position}</p>
              </div>
            )
          );
        })}
      </div>
      <div className="team-summary">
        <h3>Total Players: {team.length}/11</h3>
        <button onClick={handleCreateTeamClick} disabled={team.length === 0}>
          Create Team
        </button>
        {isFormVisible && (
          <div className="team-creation-form">
            <h3>Create Your Team</h3>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)} // Update team name state
              placeholder="Enter Team Name"
              required
            />
            <button onClick={createTeam}>Submit</button>
          </div>
        )}
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>} 

      <h2>Created Teams</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Team ID or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
      </div>
      {loadingTeams ? (
        <p>Loading teams...</p> 
      ) : (
        <div className="teams-list">
          {filteredTeams.map((team) => (
            <div key={team._id} className="team-card">
              <h3>{team.name}</h3>
              <p>Total Points: {team.totalPoints}</p>
              <p>Captain: {team.captain?.name}</p>
              <h4>Players:</h4>
              <ul>
                {team.players.map((player) => (
                  <li key={player._id}>
                    {player.name} - Points: {player.points} - Position: {player.position}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 
