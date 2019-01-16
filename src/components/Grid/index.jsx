import React from 'react';

import Cell from '../Cell';

import './index.css';

export default function Grid({
    grid,
    width,
    height,
    onClick
}) {
    const cellWidth = width / grid[0].length;
    const cellHeight = height / grid.length;
    
    return (
        <table className="grid">
            <tbody>
                {grid.map((row, rowIndex) =>
                    <tr key={rowIndex} className="row">
                        {row.map((cell, cellIndex) =>
                            <Cell
                                key={cellIndex}
                                alive={cell}
                                width={cellWidth}
                                height={cellHeight}
                                onClick={() => onClick(rowIndex, cellIndex)}
                            />
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}