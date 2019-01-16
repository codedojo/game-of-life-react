import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/Game';

ReactDOM.render(
    <Game
        width={1280}
        height={720}
        rows={144}
        cols={256}
    />,
    document.getElementById('root')
);