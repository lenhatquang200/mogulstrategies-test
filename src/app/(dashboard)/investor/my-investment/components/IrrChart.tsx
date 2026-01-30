"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

type Props = {
  irr: number
}

export default function IrrChart({ irr }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const chart = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [irr, 100 - irr],
            backgroundColor: ["#D4AF37", "#333333"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "80%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
      plugins: [
        {
          id: "centerText",
          beforeDraw(chart) {
            const { ctx, width, height } = chart
            ctx.save()
            ctx.font = "bold 18px Inter"
            ctx.fillStyle = "#D4AF37"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(`${irr}% IRR`, width / 2, height / 2)
            ctx.restore()
          },
        },
      ],
    })

    return () => chart.destroy()
  }, [irr])

  return <canvas ref={canvasRef} />
}
