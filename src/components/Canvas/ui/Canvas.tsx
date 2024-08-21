import React, { useEffect, useRef } from 'react'
import { Player, Spell } from '../../../shared/schemas';

const players: Player[] = [
    new Player(100, 100, 50, 'red', 1, 'yellow', 1500),
    new Player(500, 100, 50, 'green', -1, 'blue', 1000)
];

const spells: Spell[][] = players.map(() => []);

const index = (ball: Player) => (players.indexOf(ball) % 2 === 0 ? 1 : -1);

const drawPlayers = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    players.forEach(player => {
        context.beginPath()
        context.arc(player.x, player.y, player.r, 0, 30 * Math.PI)
        context.fillStyle = player.bg;
        context.fill()
        context.closePath()
    })
}

const updatePlayer = (player: Player, canvas: HTMLCanvasElement) => {
    player.y += player.dy
    if (player.y - player.r < 0) {
        player.y = player.r
        player.dy = -player.dy
    } else if (player.y + player.r > canvas.height) {
        player.dy = - player.dy
    }
}

const drawSpells = (context: CanvasRenderingContext2D, spells: Spell[][]) => {
    spells.forEach(spellArray => {
        spellArray.forEach(spell => {
            context.beginPath();
            context.arc(spell.x, spell.y, spell.r, 0, 2 * Math.PI);
            context.fillStyle = spell.bg;
            context.fill();
            context.closePath();
        });
    });
};

const fireSpell = (playerIndex: number, spells: Spell[][]) => {
    const player = players[playerIndex];
    const newSpell = new Spell(player.x + (player.r + 10) * index(player), player.y, 10, index(player), player.spellBg);
    spells[playerIndex].push(newSpell);
}

    const checkSpellsCollision = (player: Player, playerSpells: Spell[], canvas: HTMLCanvasElement) => {
        for (let i = playerSpells.length - 1; i >= 0; i--) {
            const spell = playerSpells[i]
            if (spell.x > canvas.width || spell.x < 0) {
                playerSpells.splice(i, 1)
                continue;
            }
            if (
                spell.x > player.x - player.r &&
                spell.x < player.x + player.r &&
                spell.y > player.y - player.r &&
                spell.y < player.y + player.r
            ) {
                playerSpells.splice(i, 1); // Удаляем spell, если он попал в игрока
                console.log(`Попал в игрока ${players.indexOf(player) + 1}`);
            }
        }
    }

    const update = (canvas: HTMLCanvasElement) => {
        players.forEach(player => {
            updatePlayer(player, canvas)
            const playerIndex = players.indexOf(player);
            let oponentIndex
            if(playerIndex > 0) {
                oponentIndex = 0
            } else {
                oponentIndex = 1
            }
            spells[playerIndex].forEach(spell => {
                spell.x += spell.dx
                spell.y += player.dy
            });
            checkSpellsCollision(players[oponentIndex], spells[playerIndex], canvas)
        })
    }



    const Canvas = () => {

        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        useEffect(() => {
            if (canvasRef) {
                const canvas = canvasRef.current;
                const context = canvas?.getContext('2d');
                if (canvas && context) {
                    const animate = () => {
                        update(canvas);
                        drawPlayers(context, canvas);
                        drawSpells(context, spells);
                        requestAnimationFrame(animate)
                    }

                    animate()
                    players.forEach((player, i) => {
                        setInterval(() => {
                            fireSpell(i, spells)
                        }, player.fireRate)
                    })
                }
            }
        }, [])

        return (
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{ border: '1px solid #333' }}
            />
        )
    }

    export default Canvas