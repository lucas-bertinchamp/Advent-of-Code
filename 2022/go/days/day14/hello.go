package main

import (
	_ "embed"
	"math"
	"strconv"
	"strings"
)

//go:embed input.txt
var input string

func buildPair(s string) (int int) {
	xy := strings.Split(s, ",")
	X, _ := strconv.Atoi(xy[0])
	Y, _ := strconv.Atoi(xy[1])
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

type Pos struct {
	x int
	y int
}

type Grid map[Pos]byte

func display(grid map[Pos]byte) {
	xmin:= math.MaxInt
	xmax:=math.MinInt
	ymin:=math.MaxInt
	ymax:=math.MinInt
	for p := range grid {
		xmin := min(xmin, p.X)
		xmax := max(xmin, p.X)
		ymin := min(ymin, p.Y)
		ymax := max(ymax, p.Y)
	}
	for y := ymin; y<= ymax; y++{
		for x:= xmin; x<= xmax; x++{
			c,ok := grid[Pos{x,y}]
			if !ok {
				print(".")
			} else {
				print(string(c))
			}
		}
		println()
	}
}

func main() {
	input := strings.TrimSuffix(machaine, "\n")
	lines := strings.Split(input, "\n")

	grid := make(Grid)

	for _, line := range lines {
		pairs := strings.Split(line, " ->")
		for i := 0; i < len(pairs)-1; i++{
			x1,y1 := buildPair(pairs[i])
			x2,y2 := buildPair(pairs[i+1])
			for a:= min(x1,x2); a<= max(x1,x2); a++ {
				for b:= min(y1,y2); b<=max(y1,y2); b++ {
					grid[Pos{a,b}] = "#"
				}
			}
		}
	}

	display(grid)
}