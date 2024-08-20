import React, { useEffect, useRef } from 'react'
import { Player, Spell } from '../../../shared/schemas';

const ball = new Player(100, 100, 50, 'red', 1)

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
            context.beginPath()
            context.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI)
            context.fillStyle = ball.bg;
            context.fill()
            context.closePath()
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

        const fireSpell = () => {
            const newSpell = new Spell(ball.x + ball.r, ball.y, 10, 5, 'blue')
            spells.push(newSpell)
        }

        const update = () => {
            //Начинаем анимацию игрока
            ball.y += ball.dy
            if(ball.y - ball.r < 0) {
                ball.y = ball.r
                ball.dy = -ball.dy
            } else if(ball.y + ball.r > canvas.height) {
                ball.dy = - ball.dy
            }
            //Начинаем швырять заклинания
            spells.forEach(spell => {
                spell.x += spell.dx
            })
            // очищаем это дерьмо
            for(let i = spells.length - 1; i >=0; i--) {
                if (spells[i].x > canvas.width) {
                    spells.splice(i, 1);
                }
            }
            

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
            }, 300)
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