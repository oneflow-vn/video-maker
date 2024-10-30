interface Cell {
  x: number;
  y: number;
}

class GameOfLifeWorld {
  private allCells: Map<string, Cell> = new Map();

  constructor() {
    this.allCells = new Map();
  }

  getCell(x: number, y: number): Cell {
    const key = x + ',' + y;
    if (!this.allCells.has(key)) {
      this.allCells.set(key, {x, y});
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.allCells.get(key)!;
  }

  getCells(aliveCells: Cell[]): Set<Cell> {
    return new Set(aliveCells.map(cell => this.getCell(cell.x, cell.y)));
  }

  neighbourCells(c: Cell): Cell[] {
    return [
      this.getCell(c.x - 1, c.y - 1),
      this.getCell(c.x - 1, c.y),
      this.getCell(c.x - 1, c.y + 1),
      this.getCell(c.x,     c.y - 1),
      this.getCell(c.x,     c.y + 1),
      this.getCell(c.x + 1, c.y - 1),
      this.getCell(c.x + 1, c.y),
      this.getCell(c.x + 1, c.y + 1),
    ];
  }

  survivors(aliveCells: Set<Cell>): Set<Cell> {
    const neighbourCounts: Map<Cell, number> = new Map;

    for (const cell of aliveCells) {
      for (const neighbour of this.neighbourCells(cell)) {
        neighbourCounts.set(neighbour, (neighbourCounts.get(neighbour) ?? 0) + 1);
      }
    }

    const newAliveCells: Set<Cell> = new Set;

    neighbourCounts.forEach((count, cell) => {
      const isAlive = aliveCells.has(cell);

      if ((isAlive && (count === 2 || count === 3)) || (!isAlive && count === 3)) {
        newAliveCells.add(cell);
      }
    });

    return newAliveCells;
  }

  getAliveNeighbourCount(lives: Set<Cell>, life: Cell) {
    return this.neighbourCells(life).filter(cell => lives.has(cell)).length;
  }
}

export { GameOfLifeWorld, Cell };
