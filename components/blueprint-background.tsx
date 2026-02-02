"use client"

import { useEffect, useRef } from "react"

export function BlueprintBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number

        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`
            ctx.scale(dpr, dpr)
        }

        const getColors = () => {
            const isDark = document.documentElement.classList.contains("dark")
            return {
                primary: isDark ? "rgba(120, 160, 200, " : "rgba(45, 75, 110, ",
                secondary: isDark ? "rgba(100, 140, 180, " : "rgba(55, 90, 130, ",
                tertiary: isDark ? "rgba(80, 120, 160, " : "rgba(70, 110, 150, ",
                accent: isDark ? "rgba(200, 175, 120, " : "rgba(170, 130, 70, ",
                grid: isDark ? "rgba(100, 140, 180, " : "rgba(50, 85, 120, ",
            }
        }

        // Multi-layer precision grid
        const drawGrid = () => {
            const colors = getColors()
            const w = window.innerWidth
            const h = window.innerHeight

            // Ultra-fine grid
            ctx.strokeStyle = colors.grid + "0.012)"
            ctx.lineWidth = 0.5
            const fineGrid = 15
            for (let x = 0; x <= w; x += fineGrid) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, h)
                ctx.stroke()
            }
            for (let y = 0; y <= h; y += fineGrid) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(w, y)
                ctx.stroke()
            }

            // Medium grid
            ctx.strokeStyle = colors.grid + "0.025)"
            ctx.lineWidth = 0.5
            const medGrid = 75
            for (let x = 0; x <= w; x += medGrid) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, h)
                ctx.stroke()
            }
            for (let y = 0; y <= h; y += medGrid) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(w, y)
                ctx.stroke()
            }

            // Major grid
            ctx.strokeStyle = colors.grid + "0.045)"
            ctx.lineWidth = 0.5
            const majorGrid = 150
            for (let x = 0; x <= w; x += majorGrid) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, h)
                ctx.stroke()
            }
            for (let y = 0; y <= h; y += majorGrid) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(w, y)
                ctx.stroke()
            }
        }

        // Complex I-beam cross section with rivets
        const drawIBeamSection = (x: number, y: number, size: number, time: number) => {
            const colors = getColors()
            const pulse = Math.sin(time * 0.001 + x * 0.01) * 0.008 + 0.055

            ctx.save()
            ctx.strokeStyle = colors.primary + `${pulse})`
            ctx.lineWidth = 0.6

            const fw = size * 0.9
            const fh = size * 0.18
            const ww = size * 0.14
            const wh = size * 0.64

            // Top flange with detail
            ctx.beginPath()
            ctx.rect(x - fw / 2, y - size / 2, fw, fh)
            ctx.stroke()

            // Flange edge detail
            ctx.strokeStyle = colors.secondary + `${pulse * 0.6})`
            ctx.beginPath()
            ctx.moveTo(x - fw / 2 + 3, y - size / 2 + fh / 2)
            ctx.lineTo(x + fw / 2 - 3, y - size / 2 + fh / 2)
            ctx.stroke()

            // Bottom flange
            ctx.strokeStyle = colors.primary + `${pulse})`
            ctx.beginPath()
            ctx.rect(x - fw / 2, y + size / 2 - fh, fw, fh)
            ctx.stroke()

            // Web
            ctx.beginPath()
            ctx.rect(x - ww / 2, y - size / 2 + fh, ww, wh)
            ctx.stroke()

            // Stiffener plates
            ctx.strokeStyle = colors.tertiary + `${pulse * 0.5})`
            ctx.lineWidth = 0.4
            ctx.beginPath()
            ctx.moveTo(x - ww / 2 - 4, y - size * 0.15)
            ctx.lineTo(x - ww / 2, y - size * 0.15)
            ctx.moveTo(x + ww / 2, y - size * 0.15)
            ctx.lineTo(x + ww / 2 + 4, y - size * 0.15)
            ctx.moveTo(x - ww / 2 - 4, y + size * 0.15)
            ctx.lineTo(x - ww / 2, y + size * 0.15)
            ctx.moveTo(x + ww / 2, y + size * 0.15)
            ctx.lineTo(x + ww / 2 + 4, y + size * 0.15)
            ctx.stroke()

            // Center axis marks
            ctx.strokeStyle = colors.accent + `${pulse * 0.7})`
            ctx.lineWidth = 0.4
            ctx.setLineDash([2, 2])
            ctx.beginPath()
            ctx.moveTo(x - size * 0.6, y)
            ctx.lineTo(x + size * 0.6, y)
            ctx.moveTo(x, y - size * 0.6)
            ctx.lineTo(x, y + size * 0.6)
            ctx.stroke()
            ctx.setLineDash([])

            ctx.restore()
        }

        // Warren truss with gusset plates
        const drawWarrenTruss = (sx: number, sy: number, width: number, height: number, time: number) => {
            const colors = getColors()
            const segments = 8
            const segW = width / segments
            const pulse = Math.sin(time * 0.0007 + sx * 0.002) * 0.008 + 0.04

            ctx.save()
            ctx.strokeStyle = colors.secondary + `${pulse})`
            ctx.lineWidth = 0.6

            // Chords
            ctx.beginPath()
            ctx.moveTo(sx, sy)
            ctx.lineTo(sx + width, sy)
            ctx.moveTo(sx, sy + height)
            ctx.lineTo(sx + width, sy + height)
            ctx.stroke()

            // Web members with gusset detail
            for (let i = 0; i <= segments; i++) {
                const x = sx + i * segW

                // Verticals at ends
                if (i === 0 || i === segments) {
                    ctx.beginPath()
                    ctx.moveTo(x, sy)
                    ctx.lineTo(x, sy + height)
                    ctx.stroke()
                }

                // Diagonals
                if (i < segments) {
                    ctx.beginPath()
                    if (i % 2 === 0) {
                        ctx.moveTo(x, sy)
                        ctx.lineTo(x + segW, sy + height)
                    } else {
                        ctx.moveTo(x, sy + height)
                        ctx.lineTo(x + segW, sy)
                    }
                    ctx.stroke()

                    // Gusset plates at nodes
                    ctx.strokeStyle = colors.tertiary + `${pulse * 0.5})`
                    ctx.lineWidth = 0.4
                    if (i % 2 === 0) {
                        ctx.beginPath()
                        ctx.arc(x, sy, 2.5, 0, Math.PI * 2)
                        ctx.stroke()
                        ctx.beginPath()
                        ctx.arc(x + segW, sy + height, 2.5, 0, Math.PI * 2)
                        ctx.stroke()
                    }
                    ctx.strokeStyle = colors.secondary + `${pulse})`
                    ctx.lineWidth = 0.6
                }
            }

            ctx.restore()
        }

        // Box girder cross section
        const drawBoxGirder = (x: number, y: number, w: number, h: number, time: number) => {
            const colors = getColors()
            const pulse = Math.sin(time * 0.0009 + y * 0.01) * 0.008 + 0.05

            ctx.save()
            ctx.strokeStyle = colors.primary + `${pulse})`
            ctx.lineWidth = 0.6

            // Outer shell
            ctx.beginPath()
            ctx.rect(x - w / 2, y - h / 2, w, h)
            ctx.stroke()

            // Inner cells
            ctx.strokeStyle = colors.secondary + `${pulse * 0.7})`
            ctx.lineWidth = 0.4
            const cellW = w / 3
            ctx.beginPath()
            ctx.moveTo(x - w / 2 + cellW, y - h / 2)
            ctx.lineTo(x - w / 2 + cellW, y + h / 2)
            ctx.moveTo(x + w / 2 - cellW, y - h / 2)
            ctx.lineTo(x + w / 2 - cellW, y + h / 2)
            ctx.stroke()

            // Deck plate
            ctx.strokeStyle = colors.tertiary + `${pulse * 0.5})`
            ctx.beginPath()
            ctx.moveTo(x - w / 2 - 8, y - h / 2)
            ctx.lineTo(x + w / 2 + 8, y - h / 2)
            ctx.stroke()

            // Diaphragm indication
            ctx.setLineDash([1, 3])
            ctx.beginPath()
            ctx.moveTo(x - w / 2, y)
            ctx.lineTo(x + w / 2, y)
            ctx.stroke()
            ctx.setLineDash([])

            ctx.restore()
        }

        // Concrete column section
        const drawColumnSection = (x: number, y: number, size: number, time: number) => {
            const colors = getColors()
            const pulse = Math.sin(time * 0.0008 + x * 0.005) * 0.01 + 0.045

            ctx.save()
            ctx.strokeStyle = colors.primary + `${pulse})`
            ctx.lineWidth = 0.6

            // Outer rectangle
            ctx.beginPath()
            ctx.rect(x - size / 2, y - size / 2, size, size)
            ctx.stroke()

            // Rebar pattern
            ctx.strokeStyle = colors.secondary + `${pulse * 0.6})`
            ctx.lineWidth = 0.4
            const rebar = 4
            const spacing = size / (rebar + 1)
            for (let i = 1; i <= rebar; i++) {
                for (let j = 1; j <= rebar; j++) {
                    const rx = x - size / 2 + spacing * i
                    const ry = y - size / 2 + spacing * j
                    ctx.beginPath()
                    ctx.arc(rx, ry, 1.5, 0, Math.PI * 2)
                    ctx.stroke()
                }
            }

            // Ties indication
            ctx.strokeStyle = colors.tertiary + `${pulse * 0.4})`
            ctx.setLineDash([1, 2])
            ctx.beginPath()
            ctx.rect(x - size / 2 + spacing * 0.8, y - size / 2 + spacing * 0.8, size - spacing * 1.6, size - spacing * 1.6)
            ctx.stroke()
            ctx.setLineDash([])

            ctx.restore()
        }

        // Cable-stayed bridge
        const drawBridge = (time: number) => {
            const colors = getColors()
            const w = window.innerWidth
            const h = window.innerHeight

            const deckY = h * 0.72
            const towerH = h * 0.48
            const t1x = w * 0.3
            const t2x = w * 0.7

            ctx.save()

            // Main deck with detail
            ctx.strokeStyle = colors.primary + "0.09)"
            ctx.lineWidth = 2.5
            ctx.beginPath()
            ctx.moveTo(-20, deckY)
            ctx.lineTo(w + 20, deckY)
            ctx.stroke()

            // Deck structure layers
            ctx.strokeStyle = colors.secondary + "0.05)"
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(0, deckY + 6)
            ctx.lineTo(w, deckY + 6)
            ctx.moveTo(0, deckY + 10)
            ctx.lineTo(w, deckY + 10)
            ctx.moveTo(0, deckY + 16)
            ctx.lineTo(w, deckY + 16)
            ctx.stroke()

            // Deck ribs
            ctx.strokeStyle = colors.tertiary + "0.03)"
            for (let x = 0; x <= w; x += 20) {
                ctx.beginPath()
                ctx.moveTo(x, deckY)
                ctx.lineTo(x, deckY + 16)
                ctx.stroke()
            }

            // Tower function
            const drawTower = (tx: number) => {
                const top = deckY - towerH

                // Main legs with taper
                ctx.strokeStyle = colors.primary + "0.12)"
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(tx - 30, deckY)
                ctx.lineTo(tx - 4, top)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(tx + 30, deckY)
                ctx.lineTo(tx + 4, top)
                ctx.stroke()

                // Tower capital
                ctx.lineWidth = 1.5
                ctx.beginPath()
                ctx.moveTo(tx - 6, top)
                ctx.lineTo(tx + 6, top)
                ctx.stroke()

                // Pylon extension
                ctx.strokeStyle = colors.primary + "0.14)"
                ctx.lineWidth = 1.5
                ctx.beginPath()
                ctx.moveTo(tx, top - 20)
                ctx.lineTo(tx, top)
                ctx.stroke()

                // Cross beams
                ctx.strokeStyle = colors.secondary + "0.06)"
                ctx.lineWidth = 0.6
                for (let i = 1; i <= 6; i++) {
                    const prog = i / 7
                    const y = deckY - towerH * prog
                    const spread = 30 * (1 - prog * 0.87)
                    ctx.beginPath()
                    ctx.moveTo(tx - spread, y)
                    ctx.lineTo(tx + spread, y)
                    ctx.stroke()
                }

                // Diagonal bracing
                ctx.strokeStyle = colors.tertiary + "0.035)"
                ctx.lineWidth = 0.4
                for (let i = 0; i < 5; i++) {
                    const prog1 = i / 6
                    const prog2 = (i + 1) / 6
                    const y1 = deckY - towerH * prog1
                    const y2 = deckY - towerH * prog2
                    const sp1 = 30 * (1 - prog1 * 0.87)
                    const sp2 = 30 * (1 - prog2 * 0.87)
                    ctx.beginPath()
                    ctx.moveTo(tx - sp1, y1)
                    ctx.lineTo(tx + sp2, y2)
                    ctx.moveTo(tx + sp1, y1)
                    ctx.lineTo(tx - sp2, y2)
                    ctx.stroke()
                }

                return top
            }

            const t1Top = drawTower(t1x)
            const t2Top = drawTower(t2x)

            // Stay cables
            const cables = 16

            const drawCables = (tx: number, top: number, leftExtent: number, rightExtent: number) => {
                // Back-span cables
                for (let i = 1; i <= cables; i++) {
                    const t = i / (cables + 1)
                    const deckX = tx - (tx - leftExtent) * t
                    const wave = Math.sin(time * 0.0005 + i * 0.15) * 0.3 + 0.7
                    ctx.strokeStyle = colors.secondary + `${0.02 + wave * 0.025})`
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(tx, top)
                    ctx.lineTo(deckX, deckY)
                    ctx.stroke()
                }

                // Main-span cables
                for (let i = 1; i <= cables; i++) {
                    const t = i / (cables + 1)
                    const deckX = tx + (rightExtent - tx) * t
                    const wave = Math.sin(time * 0.0005 + i * 0.15 + 2) * 0.3 + 0.7
                    ctx.strokeStyle = colors.secondary + `${0.02 + wave * 0.025})`
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(tx, top)
                    ctx.lineTo(deckX, deckY)
                    ctx.stroke()
                }
            }

            drawCables(t1x, t1Top, 0, (t1x + t2x) / 2)
            drawCables(t2x, t2Top, (t1x + t2x) / 2, w)

            // Foundation piers
            ctx.strokeStyle = colors.primary + "0.07)"
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(t1x, deckY + 16)
            ctx.lineTo(t1x, deckY + 55)
            ctx.moveTo(t2x, deckY + 16)
            ctx.lineTo(t2x, deckY + 55)
            ctx.stroke()

            // Pier caps
            ctx.strokeStyle = colors.secondary + "0.05)"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(t1x - 15, deckY + 55)
            ctx.lineTo(t1x + 15, deckY + 55)
            ctx.moveTo(t2x - 15, deckY + 55)
            ctx.lineTo(t2x + 15, deckY + 55)
            ctx.stroke()

            ctx.restore()
        }

        // Modern tower building
        const drawTower1 = (time: number) => {
            const colors = getColors()
            const w = window.innerWidth
            const h = window.innerHeight

            const bx = w * 0.9
            const base = h * 0.88
            const bw = 50
            const bh = h * 0.6

            ctx.save()

            // Main envelope
            ctx.strokeStyle = colors.primary + "0.065)"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(bx - bw / 2, base)
            ctx.lineTo(bx - bw / 2, base - bh)
            ctx.lineTo(bx + bw / 2, base - bh)
            ctx.lineTo(bx + bw / 2, base)
            ctx.stroke()

            // Floor levels
            ctx.strokeStyle = colors.secondary + "0.035)"
            ctx.lineWidth = 0.4
            const floors = 24
            for (let i = 1; i < floors; i++) {
                const y = base - (bh / floors) * i
                ctx.beginPath()
                ctx.moveTo(bx - bw / 2, y)
                ctx.lineTo(bx + bw / 2, y)
                ctx.stroke()
            }

            // Core walls
            ctx.strokeStyle = colors.tertiary + "0.04)"
            ctx.setLineDash([2, 3])
            ctx.beginPath()
            ctx.moveTo(bx - 8, base)
            ctx.lineTo(bx - 8, base - bh)
            ctx.moveTo(bx + 8, base)
            ctx.lineTo(bx + 8, base - bh)
            ctx.stroke()
            ctx.setLineDash([])

            // Mechanical floors
            ctx.strokeStyle = colors.secondary + "0.045)"
            ctx.lineWidth = 0.5
            const mechFloors = [6, 14, 22]
            for (const f of mechFloors) {
                const y = base - (bh / floors) * f
                ctx.beginPath()
                ctx.rect(bx - bw / 2, y - 2, bw, 4)
                ctx.stroke()
            }

            // Spire
            ctx.strokeStyle = colors.primary + "0.08)"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(bx, base - bh)
            ctx.lineTo(bx, base - bh - 40)
            ctx.stroke()

            // Crown detail
            ctx.strokeStyle = colors.secondary + "0.05)"
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(bx - 6, base - bh)
            ctx.lineTo(bx, base - bh - 15)
            ctx.lineTo(bx + 6, base - bh)
            ctx.stroke()

            ctx.restore()
        }

        // Tapered building
        const drawTower2 = (time: number) => {
            const colors = getColors()
            const w = window.innerWidth
            const h = window.innerHeight

            const bx = w * 0.06
            const base = h * 0.8
            const bw = 35
            const bh = h * 0.4

            ctx.save()

            // Tapered outline
            ctx.strokeStyle = colors.primary + "0.05)"
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(bx - bw / 2, base)
            ctx.lineTo(bx - bw * 0.3, base - bh)
            ctx.lineTo(bx + bw * 0.3, base - bh)
            ctx.lineTo(bx + bw / 2, base)
            ctx.stroke()

            // Curtain wall pattern
            ctx.strokeStyle = colors.secondary + "0.03)"
            ctx.lineWidth = 0.4
            for (let i = 1; i < 14; i++) {
                const prog = i / 14
                const y = base - bh * prog
                const taper = 1 - prog * 0.4
                ctx.beginPath()
                ctx.moveTo(bx - (bw / 2) * taper, y)
                ctx.lineTo(bx + (bw / 2) * taper, y)
                ctx.stroke()
            }

            ctx.restore()
        }

        // Dimension annotations
        const drawAnnotations = (time: number) => {
            const colors = getColors()
            const w = window.innerWidth
            const h = window.innerHeight
            const pulse = Math.sin(time * 0.0006) * 0.01 + 0.04

            ctx.save()
            ctx.strokeStyle = colors.accent + `${pulse})`
            ctx.lineWidth = 0.6

            // Horizontal span dimension
            ctx.setLineDash([2, 4])
            ctx.beginPath()
            ctx.moveTo(w * 0.3, h * 0.1)
            ctx.lineTo(w * 0.7, h * 0.1)
            ctx.stroke()
            ctx.setLineDash([])

            // Ticks
            ctx.beginPath()
            ctx.moveTo(w * 0.3, h * 0.1 - 5)
            ctx.lineTo(w * 0.3, h * 0.1 + 5)
            ctx.moveTo(w * 0.7, h * 0.1 - 5)
            ctx.lineTo(w * 0.7, h * 0.1 + 5)
            ctx.stroke()

            // Vertical dimension
            ctx.setLineDash([2, 4])
            ctx.beginPath()
            ctx.moveTo(w * 0.97, h * 0.2)
            ctx.lineTo(w * 0.97, h * 0.72)
            ctx.stroke()
            ctx.setLineDash([])

            ctx.beginPath()
            ctx.moveTo(w * 0.97 - 5, h * 0.2)
            ctx.lineTo(w * 0.97 + 5, h * 0.2)
            ctx.moveTo(w * 0.97 - 5, h * 0.72)
            ctx.lineTo(w * 0.97 + 5, h * 0.72)
            ctx.stroke()

            // Additional horizontal dimension (lower)
            ctx.setLineDash([2, 4])
            ctx.beginPath()
            ctx.moveTo(w * 0.15, h * 0.85)
            ctx.lineTo(w * 0.45, h * 0.85)
            ctx.stroke()
            ctx.setLineDash([])

            ctx.beginPath()
            ctx.moveTo(w * 0.15, h * 0.85 - 4)
            ctx.lineTo(w * 0.15, h * 0.85 + 4)
            ctx.moveTo(w * 0.45, h * 0.85 - 4)
            ctx.lineTo(w * 0.45, h * 0.85 + 4)
            ctx.stroke()

            ctx.restore()
        }

        // Corner registration marks
        const drawCorners = () => {
            const colors = getColors()
            const w = window.innerWidth
            const h = window.innerHeight
            const size = 25
            const m = 20

            ctx.save()
            ctx.strokeStyle = colors.primary + "0.09)"
            ctx.lineWidth = 0.8

            // All four corners
            ctx.beginPath()
            ctx.moveTo(m, m + size)
            ctx.lineTo(m, m)
            ctx.lineTo(m + size, m)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(w - m - size, m)
            ctx.lineTo(w - m, m)
            ctx.lineTo(w - m, m + size)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(m, h - m - size)
            ctx.lineTo(m, h - m)
            ctx.lineTo(m + size, h - m)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(w - m - size, h - m)
            ctx.lineTo(w - m, h - m)
            ctx.lineTo(w - m, h - m - size)
            ctx.stroke()

            ctx.restore()
        }

        // Center crosshair
        const drawCenterMark = () => {
            const colors = getColors()
            const w = window.innerWidth
            const h = window.innerHeight
            const cx = w / 2
            const cy = h / 2

            ctx.save()
            ctx.strokeStyle = colors.primary + "0.03)"
            ctx.lineWidth = 0.5

            ctx.beginPath()
            ctx.moveTo(cx - 40, cy)
            ctx.lineTo(cx - 10, cy)
            ctx.moveTo(cx + 10, cy)
            ctx.lineTo(cx + 40, cy)
            ctx.moveTo(cx, cy - 40)
            ctx.lineTo(cx, cy - 10)
            ctx.moveTo(cx, cy + 10)
            ctx.lineTo(cx, cy + 40)
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(cx, cy, 5, 0, Math.PI * 2)
            ctx.stroke()

            ctx.restore()
        }

        // All structural details
        const drawStructuralDetails = (time: number) => {
            const w = window.innerWidth
            const h = window.innerHeight

            // I-beam sections
            drawIBeamSection(w * 0.12, h * 0.18, 35, time)
            drawIBeamSection(w * 0.88, h * 0.12, 28, time)
            drawIBeamSection(w * 0.75, h * 0.92, 32, time)

            // Warren trusses
            drawWarrenTruss(w * 0.02, h * 0.38, 90, 28, time)
            drawWarrenTruss(w * 0.78, h * 0.9, 130, 35, time)

            // Box girders
            drawBoxGirder(w * 0.2, h * 0.9, 55, 25, time)
            drawBoxGirder(w * 0.55, h * 0.06, 45, 20, time)

            // Column sections
            drawColumnSection(w * 0.92, h * 0.35, 28, time)
            drawColumnSection(w * 0.05, h * 0.55, 22, time)
        }

        const animate = (time: number) => {
            const w = window.innerWidth
            const h = window.innerHeight
            ctx.clearRect(0, 0, w, h)

            drawGrid()
            drawCorners()
            drawCenterMark()
            drawBridge(time)
            drawTower1(time)
            drawTower2(time)
            drawStructuralDetails(time)
            drawAnnotations(time)

            animationFrameId = requestAnimationFrame(animate)
        }

        resize()
        window.addEventListener("resize", resize)
        animationFrameId = requestAnimationFrame(animate)

        const observer = new MutationObserver(() => { })
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
            observer.disconnect()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
        />
    )
}
