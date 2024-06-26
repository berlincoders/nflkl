import React, { useState } from 'react';
import GameCard from './components/GameCard';
import SearchBox from './components/SearchBox';
import seasonData from './api/nfl_season_2024.json';
import ReactPlayer from 'react-player';
import MiniCard from './components/MiniCard';
import './App.css';

export const App = () => {

  const [searchWeek, setSearchWeek] = useState(''); // State to store the search week


  // Handle input change
  const handleInputChange = (event) => {
    setSearchWeek(event.target.value);
  };

  // Filter games based on the search week
  const filteredGames = Object.entries(seasonData.games)
    .filter(([week]) => week.toLowerCase().includes(searchWeek.toLowerCase()))
    .reduce((acc, [week, games]) => {
      acc[week] = games;
      return acc;
    }, {});

  const currentWeek = 1; // Placeholder for current week logic

  // State variable to hold the week to display by default
  const [defaultWeek, setDefaultWeek] = useState(currentWeek);

  // Define handleSearch function
  const handleSearch = (query) => {
    setSearchWeek(query); // Update the searchWeek state with the query
  };


  console.log('seasonData:', seasonData); // Log seasonData

  return (
    <div className="App">
      {/*Video Hype */}

      <div className="container">
        <ReactPlayer url="https://www.youtube.com/watch?v=icMWlRCt5qo" />
        {/* https://www.youtube.com/watch?v=rrAioAcW3rc*/}
        {/* https://www.youtube.com/watch?v=icMWlRCt5qo*/}
        {/* https://www.youtube.com/watch?v=THfonmqAONQ*/}
      </div>

      {/* Search box */}
      <div>
        <div className="container">
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>

      <div className="container">
  {/* Map filtered games */}
  
  {Object.entries(filteredGames).map(([week, games]) => (
    <div key={week}>
      <h2>Week {week}</h2>
      <div className="row">
        {games.map((game, index) => (
          <div key={index} className="col-md-4">
            {game.available ? (
              <GameCard key={index} game={game} />
            ) : (
              <MiniCard key={index} game={game} />
            )}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default App;
