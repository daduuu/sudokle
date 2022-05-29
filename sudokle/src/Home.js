import React from 'react';
 
const home = () => {
    return (
      <header className="App-header">
        <h1 id="title">Sudokle</h1>
        <table>
          <thead>
            <tr>
              <button id="playbtn">
                Play
              </button>
            </tr>
          </thead>
        </table>
      </header>
    );
}
 
export default home;