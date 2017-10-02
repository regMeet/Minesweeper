import React from 'react';
import Modal from 'react-modal';

const HelpModal = (props) => {
  return (


      <Modal
        contentLabel={'Help'}
        isOpen={ props.isHelpModalOpen }
        onRequestClose={ () => props.onClose() }>

        <div className="help-modal">
          Minesweeper is a grid of tiles, each of which may or may not cover hidden mines.
          The goal is to click on every tile except those that have mines.
          When a user clicks a tile, one of two things happens.
          If the tile was covering a mine, the mine is revealed and the game ends in failure.
          If the tile was not covering a mine, it instead reveals the number of adjacent (including diagonals) tiles
          that are covering mines - and, if that number was 0, behaves as if the user has clicked on every cell around it.
          On every turn, the game is validated:

          <ul>
            <li>If the user uncovered a bomb tile, the user lost and the game ends.</li>
            <li>If the user uncovered a non-bomb tile (number) and there are remaining non-bomb tiles uncovered, the game continues. Otherwise, the user won.</li>
          </ul>

          <button className="close" onClick={() => props.onClose()}>X</button>
        </div>
      </Modal>

  );
};

export default HelpModal;
