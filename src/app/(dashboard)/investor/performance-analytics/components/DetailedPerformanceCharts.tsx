"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

// register
Chart.register(
  LineController,
  BarController,
  MatrixController,
  MatrixElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default function DetailedPerformanceCharts() {
    const cumulativeRef = useRef<HTMLCanvasElement | null>(null);
    const rollingRef = useRef<HTMLCanvasElement | null>(null);
    const heatmapRef = useRef<HTMLCanvasElement | null>(null);
    const drawdownRef = useRef<HTMLCanvasElement | null>(null);
    type HeatmapPoint = {
        x: string;
        y: string;
        v: number;
    };

    useEffect(() => {
    if (
        !cumulativeRef.current ||
        !rollingRef.current ||
        !heatmapRef.current ||
        !drawdownRef.current
    )
        return;

    // ===== Cumulative Return vs Benchmark =====
    const cumulativeChart = new Chart(cumulativeRef.current, {
        type: "line",
        data: {
        labels: ["2022", "2023", "2024", "2025"],
        datasets: [
            {
            label: "Mogul Portfolio",
            data: [100, 128, 152, 186],
            borderColor: "#D4AF37",
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            tension: 0.4,
            fill: true,
            },
            {
            label: "S&P 500",
            data: [100, 124, 138, 158],
            borderColor: "#00ffcc",
            borderDash: [5, 5],
            },
        ],
        },
        options: {
        responsive: true,
        plugins: {
            legend: { labels: { color: "#E0E0E0" } },
        },
        scales: {
            x: { ticks: { color: "#E0E0E0" } },
            y: { ticks: { color: "#E0E0E0" } },
        },
        },
    });

    // ===== Rolling 12-Month Returns =====
    const rollingChart = new Chart(rollingRef.current, {
        type: "bar",
        data: {
        labels: ["2023", "2024", "2025"],
        datasets: [
            {
            label: "Rolling 12-Month Return",
            data: [22.4, 31.8, 27.9],
            backgroundColor: "#D4AF37",
            },
        ],
        },
        options: { responsive: true },
    });

    // ===== Monthly Returns Heatmap =====
    const heatmapChart = new Chart(heatmapRef.current, {
        type: "matrix",
        data: {
        datasets: [
            {
            label: "Monthly Returns (%)",
            data: [
                { x: "Jan", y: "2025", v: 3.2 },
                { x: "Feb", y: "2025", v: 5.1 },
                { x: "Mar", y: "2025", v: -1.8 },
                { x: "Apr", y: "2025", v: 4.7 },
                { x: "May", y: "2025", v: 6.3 },
                { x: "Jun", y: "2025", v: 2.9 },
                { x: "Jul", y: "2025", v: 8.1 },
                { x: "Aug", y: "2025", v: -2.4 },
                { x: "Sep", y: "2025", v: 7.5 },
                { x: "Oct", y: "2025", v: 4.2 },
                { x: "Nov", y: "2025", v: 3.8 },
                { x: "Dec", y: "2025", v: 5.6 },
            ] as HeatmapPoint[],

            backgroundColor(ctx) {
                const raw = ctx.raw as HeatmapPoint;
                const alpha = Math.abs(raw.v) / 10;
                return raw.v > 0
                ? `rgba(212, 175, 55, ${alpha})`
                : `rgba(255, 107, 107, ${alpha})`;
            },

            borderColor: "#333",
            borderWidth: 1,
            width: ({ chart }) =>
                (chart.chartArea?.width || 0) / 12 - 1,
            height: ({ chart }) =>
                (chart.chartArea?.height || 0) - 1,
            },
        ],
        },
        options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
            callbacks: {
                label: (ctx) => {
                const raw = ctx.raw as HeatmapPoint;
                return `Return: ${raw.v}%`;
                },
            },
            },
        },
        scales: {
            x: { ticks: { color: "#E0E0E0" } },
            y: { ticks: { color: "#E0E0E0" } },
        },
        },
    });

    // ===== Drawdown Analysis =====
    const drawdownChart = new Chart(drawdownRef.current, {
        type: "line",
        data: {
        labels: [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec",
        ],
        datasets: [
            {
            label: "Drawdown (%)",
            data: [
                0, -2.1, -4.3, -3.8, -1.2, 0,
                -1.5, -6.2, -9.2, -7.8, -5.4, -3.1,
            ],
            borderColor: "#ff6b6b",
            backgroundColor: "rgba(255, 107, 107, 0.2)",
            fill: true,
            tension: 0.4,
            },
        ],
        },
        options: {
        responsive: true,
        scales: {
            x: { ticks: { color: "#E0E0E0" } },
            y: { ticks: { color: "#E0E0E0" } },
        },
        },
    });

    return () => {
        cumulativeChart.destroy();
        rollingChart.destroy();
        heatmapChart.destroy();
        drawdownChart.destroy();
    };
    }, []);

    return (
        <section id="detailed-charts">
            <h2 className="section-title">Detailed Performance Charts</h2>

            <div className="charts-grid">
                <div className="chart-card">
                <h3>Cumulative Return vs. Benchmark</h3>
                <canvas ref={cumulativeRef} />
                </div>

                <div className="chart-card">
                <h3>Rolling 12-Month Returns</h3>
                <canvas ref={rollingRef} />
                </div>

                <div className="chart-card">
                <h3>Monthly Returns Heatmap</h3>
                <canvas ref={heatmapRef} />
                </div>

                <div className="chart-card">
                <h3>Drawdown Analysis</h3>
                <canvas ref={drawdownRef} />
                </div>
            </div>
        </section>
  );
}
