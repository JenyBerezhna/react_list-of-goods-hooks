import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortMode = 'alphabet' | 'length' | null;
type Direction = 'asc' | 'desc' | null;

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortMode, setSortMode] = useState<SortMode>(null);
  const [direction, setDirection] = useState<Direction>(null);
  const [reverseActive, setReverseActive] = useState(false);

  const sortAlphabetically = (items: string[], dir: Direction) => {
    const sorted = [...items].sort((a, b) => a.localeCompare(b));

    return dir === 'desc' ? sorted.reverse() : sorted;
  };

  const sortByLength = (items: string[], dir: Direction) => {
    const sorted = [...items].sort((a, b) => a.length - b.length);

    return dir === 'desc' ? sorted.reverse() : sorted;
  };

  const reverseList = (items: string[]) => [...items].reverse();

  const handleSortAlphabet = () => {
    const sorted = sortAlphabetically(goodsFromServer, 'asc');

    setGoods(sorted);
    setSortMode('alphabet');
    setDirection('asc');
    setReverseActive(false);
  };

  const handleSortLength = () => {
    const sorted = sortByLength(goodsFromServer, 'asc');

    setGoods(sorted);
    setSortMode('length');
    setDirection('asc');
    setReverseActive(false);
  };

  const handleReverse = () => {
    const reversed = reverseList(goods);
    const newDirection = direction === 'asc' ? 'desc' : 'asc';

    setGoods(reversed);
    setDirection(newDirection);
    setReverseActive(true);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortMode(null);
    setDirection(null);
    setReverseActive(false);
  };

  const isActive = (mode: SortMode) => sortMode === mode;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${isActive('alphabet') ? '' : ' is-light'}`}
          onClick={handleSortAlphabet}
          data-cy="sort-alphabet"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${isActive('length') ? '' : ' is-light'}`}
          onClick={handleSortLength}
          data-cy="sort-length"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${reverseActive ? '' : ' is-light'}`}
          onClick={handleReverse}
          data-cy="reverse"
        >
          Reverse
        </button>

        {(sortMode || reverseActive) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
            data-cy="reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((item, index) => (
          <li key={index} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
