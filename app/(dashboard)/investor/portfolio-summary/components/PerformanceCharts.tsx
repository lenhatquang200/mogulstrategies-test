"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  DoughnutController,
  LineController,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// register chart.js modules
Chart.register(
  DoughnutController,
  LineController,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function PerformanceCharts() {
  const allocationRef = useRef<HTMLCanvasElement | null>(null);
  const portfolioRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!allocationRef.current || !portfolioRef.current) return;

    // ===== Asset Allocation Chart =====
    const allocationChart = new Chart(allocationRef.current, {
      type: "doughnut",
      data: {
        labels: [
          "Equities",
          "Digital Assets",
          "Real Estate",
          "Technologies",
          "Creative Arts",
          "Recycling",
        ],
        datasets: [
          {
            data: [22, 28, 18, 15, 10, 7],
            backgroundColor: [
              "#D4AF37",
              "#00ffcc",
              "#ff6b6b",
              "#4ecdc4",
              "#ffe66d",
              "#95e1d3",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#E0E0E0",
            },
          },
        },
      },
    });

    // ===== Portfolio Value Chart =====
    const portfolioChart = new Chart(portfolioRef.current, {
      type: "line",
      data: {
        labels: [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec",
        ],
        datasets: [
          {
            label: "Portfolio Value ($)",
            data: [
              1000000, 1050000, 1120000, 1180000,
              1250000, 1320000, 1380000, 1420000,
              1490000, 1550000, 1580000, 1586400,
            ],
            borderColor: "#D4AF37",
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#E0E0E0",
            },
          },
        },
        scales: {
          x: { ticks: { color: "#E0E0E0" } },
          y: { ticks: { color: "#E0E0E0" } },
        },
      },
    });

    // cleanup
    return () => {
      allocationChart.destroy();
      portfolioChart.destroy();
    };
  }, []);

  return (
    <section id="charts">
      <h2 className="section-title">Performance Charts</h2>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Asset Allocation</h3>
          <canvas ref={allocationRef} />
        </div>

        <div className="chart-card">
          <h3>Portfolio Value Over Time</h3>
          <canvas ref={portfolioRef} />
        </div>
      </div>
    </section>
  );
}
