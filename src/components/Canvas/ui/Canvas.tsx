import React, { useEffect, useRef } from 'react'
import { Player, Spell } from '../../../shared/schemas';

const balls: Player[] = [new Player(100, 100, 50, 'red', 1, 'yellow'), new Player(500, 100, 50, 'green', -1, 'blue')]

const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) {
            return
        }
        const spells: Spell[] = []

        const context = canvas.getContext('2d')

        const drawBall = (context: CanvasRenderingContext2D) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => {
                context.beginPath()
                context.arc(ball.x, ball.y, ball.r, 0, 30 * Math.PI)
                context.fillStyle = ball.bg;
                context.fill()
                context.closePath()
            })
        }

        const updateBall = (ball: Player) => {
            ball.y += ball.dy
            if(ball.y - ball.r < 0) {
                ball.y = ball.r
                ball.dy = -ball.dy
            } else if(ball.y + ball.r > canvas.height) {
                ball.dy = - ball.dy
            }
        }

        const drawSpell = (context: CanvasRenderingContext2D) => {
            spells.forEach(spell => {
                context.beginPath();
                context.arc(spell.x, spell.y, spell.r, 0, 2 * Math.PI);
                context.fillStyle = spell.bg;
                context.fill();
                context.closePath();
            })
        };

        const index = (ball: Player) => {
            if(balls.indexOf(ball) % 2 === 0) {
                return 1
            } else {
                return -1
            }
        }

        const fireSpell = () => {
            balls.forEach(ball => {
                const newSpell = new Spell(ball.x + (ball.r + 10) * index(ball), ball.y, 10, index(ball), ball.spellBg)
                spells.push(newSpell)
            })
        }

        const update = () => {
            //Начинаем анимацию игрока
            balls.forEach(ball => {
                updateBall(ball)
                spells.forEach(spell => {
                    spell.x += spell.dx
                    spell.y += ball.dy
                })
                for(let i = spells.length - 1; i >=0; i--) {
                    if (spells[i].x > canvas.width) {
                        spells.splice(i, 1);
                    }
                    if(
                        (spells[i].x < ball.x + ball.r && spells[i].x > ball.x - ball.r)
                        &&
                        (spells[i].y > ball.y + ball.r && spells[i].y < ball.y - ball.r)
                    ) {
                        spells.splice(i, 1);
                        console.log('Попал')
                        
                    }
                }
            })
        }

        const animate = () => {
            if(context) {
                update()
                drawBall(context)
                drawSpell(context)
                requestAnimationFrame(animate)
            }
        }

        if(context) {
            setInterval(() => {
                fireSpell()
            }, 1500)
            animate()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            style={{border: '1px solid #333'}}
        />
    )
}

export default Canvas