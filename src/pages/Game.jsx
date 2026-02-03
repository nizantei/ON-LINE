import React from 'react';
import { CsvDataProvider } from '../contexts/CsvDataProvider';
import GameContainer from '../components/game/GameContainer';

export default function Game() {
  return (
    <CsvDataProvider>
      <GameContainer />
    </CsvDataProvider>
  );
}