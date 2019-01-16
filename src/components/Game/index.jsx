import React from 'react';

import Grid from '../Grid';
import Controls from '../Controls';

import './index.css';

export default class Game extends React.Component {
    state = {
        grid: this.createGrid(),
        isPlaying: false,
        speed: 0
    };

    createGrid(randomize = false) {
        const grid = [];

        for (let i = 0; i < this.props.rows; i++) {
            grid[i] = [];

            for (let j = 0; j < this.props.cols; j++) {
                grid[i][j] = randomize ? Boolean(Math.round(Math.random())) : false;
            }
        }

        return grid;
    }

    nextGrid() {
        const nextGrid = this.createGrid();

        this.state.grid.forEach((row, rowIndex) => {
            return row.forEach((alive, cellIndex) => {
                const numberOfNeighbors = this.countNeighbors(rowIndex, cellIndex);
                
                if (alive) {
                    if (numberOfNeighbors < 2) {
                        nextGrid[rowIndex][cellIndex] = false;
                    } else if (numberOfNeighbors === 2 || numberOfNeighbors === 3) {
                        nextGrid[rowIndex][cellIndex] = true;
                    } else if (numberOfNeighbors > 3) {
                        nextGrid[rowIndex][cellIndex] = false;
                    }
                } else {
                    if (numberOfNeighbors === 3) {
                        nextGrid[rowIndex][cellIndex] = true;
                    }
                }
            });
        });

        return nextGrid;
    }

    countNeighbors(row, col) {
        let count = 0;

        if (this.isCellAlive(row - 1, col - 1)) count++; // top left
        if (this.isCellAlive(row - 1, col)) count++; // top
        if (this.isCellAlive(row - 1, col + 1)) count++; // top right
        if (this.isCellAlive(row, col + 1)) count++; // right
        if (this.isCellAlive(row + 1, col + 1)) count++; // bottom right
        if (this.isCellAlive(row + 1, col)) count++; // bottom
        if (this.isCellAlive(row + 1, col - 1)) count++; // bottom left
        if (this.isCellAlive(row, col - 1)) count++; // left

        return count;
    }

    isCellAlive(row, col) {
        const grid = this.state.grid;

        if (!grid[row] || !grid[row][col]) return false;

        return grid[row][col];
    }

    updateGrid(rowIndex, cellIndex) {
        const grid = this.state.grid.map((row, index) => {
            if (index !== rowIndex) return row;

            return row.map((cell, index) => {
                if (index !== cellIndex) return cell;

                return !cell;
            });
        });

        this.setState({ grid });
    }

    randomizeGrid() {
        const grid = this.createGrid(true);

        this.setState({ grid });
    }

    resetGrid() {
        const grid = this.createGrid();

        this.setState({ grid });
    }

    changeSpeed(speed) {
        this.setState({ speed }, () => {
            this.stopInterval();
            this.startInterval();
        });
    }

    startInterval() {
        this.interval = setInterval(this.next.bind(this), 1000 - this.state.speed);
    }

    stopInterval() {
        clearInterval(this.interval);
    }

    next() {
        const nextGrid = this.nextGrid();

        this.setState({ grid: nextGrid });
    }

    play() {
        this.startInterval();
        
        this.setState({ isPlaying: true });
    }

    pause() {
        this.stopInterval();

        this.setState({ isPlaying: false });
    }

    handleGridClick = (rowIndex, cellIndex) => this.updateGrid(rowIndex, cellIndex);

    handleStartButtonClick = () => {
        if (this.state.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    };

    handleResetButtonClick = () => this.resetGrid();

    handleRandomizeButtonClick = () => this.randomizeGrid();

    handleSpeedSliderChange = speed => this.changeSpeed(speed);

    render() {
        const { width, height } = this.props;
        const { grid, isPlaying, speed } = this.state;

        return (
            <React.Fragment>
                <Grid
                    grid={grid}
                    width={width}
                    height={height}
                    onClick={this.handleGridClick}
                />

                <Controls
                    isPlaying={isPlaying}
                    speed={speed}
                    onStart={this.handleStartButtonClick}
                    onReset={this.handleResetButtonClick}
                    onRandomize={this.handleRandomizeButtonClick}
                    onSpeedChange={this.handleSpeedSliderChange}
                />
            </React.Fragment>
        );
    }
}