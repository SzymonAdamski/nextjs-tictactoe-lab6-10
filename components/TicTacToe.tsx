'use client';

import { useState, useEffect } from 'react';

type Cell = 'X' | 'O' | null;
type Board = Cell[][];

interface GameConfig {
  boardSize: number;
  cellSize: number;
  symbolSize: number;
  backgroundColor: string;
  gridColor: string;
  xColor: string;
  oColor: string;
  winningLength: number;
}

interface TicTacToeProps {
  initialConfig?: Partial<GameConfig>;
  onSave?: (gameState: GameState) => void;
  savedState?: GameState | null;
}

interface GameState {
  board: Board;
  currentPlayer: 'X' | 'O';
  xMoves: number;
  oMoves: number;
  winner: 'X' | 'O' | 'draw' | null;
  config: GameConfig;
}

const defaultConfig: GameConfig = {
  boardSize: 10,
  cellSize: 50,
  symbolSize: 30,
  backgroundColor: '#ffffff',
  gridColor: '#333333',
  xColor: '#e74c3c',
  oColor: '#3498db',
  winningLength: 5,
};

export default function TicTacToe({ initialConfig, onSave, savedState }: TicTacToeProps) {
  const [config, setConfig] = useState<GameConfig>({ ...defaultConfig, ...initialConfig });
  const [board, setBoard] = useState<Board>(() => 
    Array(config.boardSize).fill(null).map(() => Array(config.boardSize).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [xMoves, setXMoves] = useState(0);
  const [oMoves, setOMoves] = useState(0);
  const [winner, setWinner] = useState<'X' | 'O' | 'draw' | null>(null);

  // Wczytaj zapisany stan
  useEffect(() => {
    if (savedState) {
      setBoard(savedState.board);
      setCurrentPlayer(savedState.currentPlayer);
      setXMoves(savedState.xMoves);
      setOMoves(savedState.oMoves);
      setWinner(savedState.winner);
      setConfig(savedState.config);
    }
  }, [savedState]);

  // Resetuj planszę gdy zmienia się rozmiar
  useEffect(() => {
    resetGame();
  }, [config.boardSize]);

  const resetGame = () => {
    setBoard(Array(config.boardSize).fill(null).map(() => Array(config.boardSize).fill(null)));
    setCurrentPlayer('X');
    setXMoves(0);
    setOMoves(0);
    setWinner(null);
  };

  const checkWinner = (board: Board, row: number, col: number, player: 'X' | 'O'): boolean => {
    const directions = [
      [0, 1],   // poziomo
      [1, 0],   // pionowo
      [1, 1],   // przekątna \
      [1, -1],  // przekątna /
    ];

    for (const [dx, dy] of directions) {
      let count = 1;

      // Sprawdź w jednym kierunku
      for (let i = 1; i < config.winningLength; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (
          newRow >= 0 && newRow < config.boardSize &&
          newCol >= 0 && newCol < config.boardSize &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      // Sprawdź w przeciwnym kierunku
      for (let i = 1; i < config.winningLength; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (
          newRow >= 0 && newRow < config.boardSize &&
          newCol >= 0 && newCol < config.boardSize &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= config.winningLength) {
        return true;
      }
    }

    return false;
  };

  const handleCellClick = (row: number, col: number) => {
    if (winner || board[row][col]) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (currentPlayer === 'X') {
      setXMoves(xMoves + 1);
    } else {
      setOMoves(oMoves + 1);
    }

    // Sprawdź wygraną
    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setWinner(currentPlayer);
      return;
    }

    // Sprawdź remis
    const freeCells = newBoard.flat().filter(cell => cell === null).length;
    if (freeCells === 0) {
      setWinner('draw');
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const saveGame = () => {
    const gameState: GameState = {
      board,
      currentPlayer,
      xMoves,
      oMoves,
      winner,
      config,
    };
    if (onSave) {
      onSave(gameState);
    }
    
    // Zapisz do listy gier w localStorage
    const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
    savedGames.push({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      gameState
    });
    localStorage.setItem('savedGames', JSON.stringify(savedGames));
    
    // Zapisz także jako bieżącą grę
    localStorage.setItem('ticTacToeGame', JSON.stringify(gameState));
    alert('Gra zapisana!');
  };

  const loadGame = () => {
    const saved = localStorage.getItem('ticTacToeGame');
    if (saved) {
      const gameState: GameState = JSON.parse(saved);
      setBoard(gameState.board);
      setCurrentPlayer(gameState.currentPlayer);
      setXMoves(gameState.xMoves);
      setOMoves(gameState.oMoves);
      setWinner(gameState.winner);
      setConfig(gameState.config);
      alert('Gra wczytana!');
    } else {
      alert('Brak zapisanej gry!');
    }
  };

  const freeCells = board.flat().filter(cell => cell === null).length;

  return (
    <div style={{ padding: '20px' }}>
      {/* Status gry */}
      <div className="card mb-2">
        <h3 className="mb-2">Status gry</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '15px' }}>
          <div>
            <strong>Gracz X:</strong>
            <div style={{ fontSize: '24px', color: config.xColor }}>{xMoves} ruchów</div>
          </div>
          <div>
            <strong>Gracz O:</strong>
            <div style={{ fontSize: '24px', color: config.oColor }}>{oMoves} ruchów</div>
          </div>
          <div>
            <strong>Wolne pola:</strong>
            <div style={{ fontSize: '24px' }}>{freeCells}</div>
          </div>
          <div>
            <strong>Teraz gra:</strong>
            <div style={{ fontSize: '24px', color: currentPlayer === 'X' ? config.xColor : config.oColor }}>
              {winner ? '-' : currentPlayer}
            </div>
          </div>
        </div>

        {winner && (
          <div style={{ 
            padding: '15px', 
            background: winner === 'draw' ? '#95a5a6' : (winner === 'X' ? config.xColor : config.oColor),
            color: 'white',
            borderRadius: '5px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            {winner === 'draw' ? '🤝 Remis!' : `🏆 Wygrywa gracz ${winner}!`}
          </div>
        )}
      </div>

      {/* Plansza */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '20px',
        overflowX: 'auto'
      }}>
        <svg
          width={config.boardSize * config.cellSize}
          height={config.boardSize * config.cellSize}
          style={{ 
            background: config.backgroundColor,
            border: `2px solid ${config.gridColor}`,
            borderRadius: '5px'
          }}
        >
          {/* Linie poziome */}
          {Array.from({ length: config.boardSize - 1 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={(i + 1) * config.cellSize}
              x2={config.boardSize * config.cellSize}
              y2={(i + 1) * config.cellSize}
              stroke={config.gridColor}
              strokeWidth={1}
            />
          ))}

          {/* Linie pionowe */}
          {Array.from({ length: config.boardSize - 1 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i + 1) * config.cellSize}
              y1={0}
              x2={(i + 1) * config.cellSize}
              y2={config.boardSize * config.cellSize}
              stroke={config.gridColor}
              strokeWidth={1}
            />
          ))}

          {/* Symbole */}
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const x = colIndex * config.cellSize + config.cellSize / 2;
              const y = rowIndex * config.cellSize + config.cellSize / 2;

              if (cell === 'X') {
                const offset = config.symbolSize / 2;
                return (
                  <g key={`${rowIndex}-${colIndex}`}>
                    <line
                      x1={x - offset}
                      y1={y - offset}
                      x2={x + offset}
                      y2={y + offset}
                      stroke={config.xColor}
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                    <line
                      x1={x + offset}
                      y1={y - offset}
                      x2={x - offset}
                      y2={y + offset}
                      stroke={config.xColor}
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                  </g>
                );
              } else if (cell === 'O') {
                return (
                  <circle
                    key={`${rowIndex}-${colIndex}`}
                    cx={x}
                    cy={y}
                    r={config.symbolSize / 2}
                    fill="none"
                    stroke={config.oColor}
                    strokeWidth={3}
                  />
                );
              }
              return null;
            })
          )}

          {/* Klikalne obszary */}
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <rect
                key={`click-${rowIndex}-${colIndex}`}
                x={colIndex * config.cellSize}
                y={rowIndex * config.cellSize}
                width={config.cellSize}
                height={config.cellSize}
                fill="transparent"
                style={{ cursor: winner || cell ? 'default' : 'pointer' }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))
          )}
        </svg>
      </div>

      {/* Przyciski sterowania */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button onClick={resetGame} className="btn btn-primary">
          🔄 Nowa gra
        </button>
        <button onClick={saveGame} className="btn btn-secondary">
          💾 Zapisz grę
        </button>
        <button onClick={loadGame} className="btn btn-secondary">
          📂 Wczytaj grę
        </button>
      </div>

      {/* Konfiguracja */}
      <div className="card">
        <h3 className="mb-2">Konfiguracja planszy</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div className="form-group">
            <label className="form-label">Rozmiar planszy (n×n)</label>
            <input
              type="number"
              min="3"
              max="20"
              value={config.boardSize}
              onChange={(e) => setConfig({ ...config, boardSize: parseInt(e.target.value) })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rozmiar pola (px)</label>
            <input
              type="number"
              min="30"
              max="100"
              value={config.cellSize}
              onChange={(e) => setConfig({ ...config, cellSize: parseInt(e.target.value) })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rozmiar symbolu (px)</label>
            <input
              type="number"
              min="10"
              max="80"
              value={config.symbolSize}
              onChange={(e) => setConfig({ ...config, symbolSize: parseInt(e.target.value) })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Długość wygranej</label>
            <input
              type="number"
              min="3"
              max="10"
              value={config.winningLength}
              onChange={(e) => setConfig({ ...config, winningLength: parseInt(e.target.value) })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kolor tła</label>
            <input
              type="color"
              value={config.backgroundColor}
              onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
              className="form-input"
              style={{ height: '40px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kolor krawędzi</label>
            <input
              type="color"
              value={config.gridColor}
              onChange={(e) => setConfig({ ...config, gridColor: e.target.value })}
              className="form-input"
              style={{ height: '40px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kolor X</label>
            <input
              type="color"
              value={config.xColor}
              onChange={(e) => setConfig({ ...config, xColor: e.target.value })}
              className="form-input"
              style={{ height: '40px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kolor O</label>
            <input
              type="color"
              value={config.oColor}
              onChange={(e) => setConfig({ ...config, oColor: e.target.value })}
              className="form-input"
              style={{ height: '40px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
