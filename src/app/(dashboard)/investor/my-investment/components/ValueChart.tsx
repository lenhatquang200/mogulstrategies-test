"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

type Props = {
  data: number[]
}

export default function ValueChart({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            data,
            borderColor: "#D4AF37",
            backgroundColor: "rgba(212,175,55,0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    })

    return () => chart.destroy()
  }, [data])

  return <canvas ref={canvasRef} />
}
