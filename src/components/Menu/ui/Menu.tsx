import React from 'react'
import { useStore } from '../../../store/store';
import styles from './style.module.css';

const Menu = () => {

    const {player1, player2} = useStore(state => state.score);
    const clearAll = useStore(state => state.clearAll);
    const isRunning = useStore(state => state.isRunning)
    const setIsRunning = useStore(state => state.setIsRunning);
    return (
        <div className={styles.menu}>
            <div className={styles.score}>
                <span>Игрок 1</span>
                <span>{player1}</span>
            </div>
            <button onClick={() => {
                setIsRunning()
                clearAll()
            }}>{isRunning ? 'стоп' : 'старт'}</button>
            <div className={styles.score}>
                <span>Игрок 2</span>
                <span>{player2}</span>
            </div>
            
        </div>
    )
}

export default Menu