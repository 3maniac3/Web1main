import pygame
import random

pygame.init()

w, h = 1000, 2000
screen = pygame.display.set_mode((w, h))

class Tetrimino:
	def __init__(self, x, y, color):
		self.x = x
		self.y = y
		self.w = 50
		self.h = 50
		self.color = color
		
class RowFull:
		def __init__(self, num):
			self.num = num
		
# buttons
leftButton = pygame.Rect((50, 1150, 200, 100))
rightButton = pygame.Rect((450, 1150, 200, 100))
rotateButton = pygame.Rect((300, 1150, 100, 100))
speedButton = pygame.Rect((200, 1280, 300, 100))

upButton = pygame.Rect((600, 200, 100, 200))
downButton = pygame.Rect((550, 600, 100, 200))

# font 
textFont = pygame.font.SysFont("Monospace", 50)

textNext = textFont.render("Next: ", 1, ("black"))

# colours
red = 255, 0, 0
green = 0, 255, 0
blue = 0, 0, 255
yellow = 255, 255, 0
purple = 255, 0, 255
orange = 255, 155, 0
lightblue = 0, 255, 255

# tetrimino shapes
shape_O = [[200, 250, 200, 250], [-150, -150, -200, -200],  [yellow]] # O

shape_I = [[150, 200, 250, 300], [-150, -150, -150, -150], [lightblue]] # I

shape_T = [[200, 200, 250, 200], [-150, -200, -200, -250], [purple]] # T

shape_L = [[200, 250, 200, 200], [-150, -150, -200, -250], [orange]] # L

shape_J = [[200, 250, 250, 250], [-150, -150, -200, -250], [blue]] # J

shape_S = [[250, 250, 200, 200], [-150, -200, -200, -250], [green]] # S

shape_Z = [[200, 200, 250, 250], [-150, -200, -200, -250], [red]] # Z

allShapes = [shape_O, shape_I, shape_T, shape_L, shape_J, shape_S, shape_Z]

ranShape = random.choice(allShapes)

preStore = 0

# next tetri display
display_O = [(570, 420, 40, 40), (610, 420, 40, 40), (570, 460, 40, 40), (610, 460, 40, 40)] # dis O

display_I = [(530, 440, 40, 40), (570, 440, 40, 40), (610, 440, 40, 40), (650, 440, 40, 40)] # dis I

display_T = [(570, 400, 40, 40), (570, 440, 40, 40), (570, 480, 40, 40), (610, 440, 40, 40)] # dis T

display_L = [(570, 400, 40, 40), (570, 440, 40, 40), (570, 480, 40, 40), (610, 480, 40, 40)] # dis L

display_J = [(610, 400, 40, 40), (610, 440, 40, 40), (610, 480, 40, 40), (570, 480, 40, 40)] # dis J

display_S = [(570, 400, 40, 40), (570, 440, 40, 40), (610, 440, 40, 40), (610, 480, 40, 40)] # dis S

display_Z = [(610, 400, 40, 40), (610, 440, 40, 40), (570, 440, 40, 40), (570, 480, 40, 40)] # dis Z

# tetrimino data
start = True
shapeStart = 0
moveTetri = [Tetrimino(200, 0, yellow), Tetrimino(250, 0, yellow), Tetrimino(200, -50, yellow), Tetrimino(250, -50, yellow)]
if start:
	shapeStart = random.randint(0, 6)
	if shapeStart == 0:
		for s in range(4):
			moveTetri[s].x = shape_O[0][s]
			moveTetri[s].y = shape_O[1][s]
			moveTetri[s].color = shape_O[2][0]
	if shapeStart == 1:
		for s in range(4):
			moveTetri[s].x = shape_I[0][s]
			moveTetri[s].y = shape_I[1][s]
			moveTetri[s].color = shape_I[2][0]
	if shapeStart == 2:
		for s in range(4):
			moveTetri[s].x = shape_T[0][s]
			moveTetri[s].y = shape_T[1][s]
			moveTetri[s].color = shape_T[2][0]
	if shapeStart == 3:
		for s in range(4):
			moveTetri[s].x = shape_L[0][s]
			moveTetri[s].y = shape_L[1][s]
			moveTetri[s].color = shape_L[2][0]
	if shapeStart == 4:
		for s in range(4):
			moveTetri[s].x = shape_J[0][s]
			moveTetri[s].y = shape_J[1][s]
			moveTetri[s].color = shape_J[2][0]
	if shapeStart == 5:
		for s in range(4):
			moveTetri[s].x = shape_S[0][s]
			moveTetri[s].y = shape_S[1][s]
			moveTetri[s].color = shape_S[2][0]
	if shapeStart == 6:
		for s in range(4):
			moveTetri[s].x = shape_Z[0][s]
			moveTetri[s].y = shape_Z[1][s]
			moveTetri[s].color = shape_Z[2][0]
	start = False

idx0 = [0, 0]
idx1 = [0, 0]
idx2 = [0, 0]
idx3 = [0, 0]

blockTetri = []

# full row detect
reRow = [
0, 50, 100, 150, 200,
250, 300, 350, 400, 450, 
500, 550, 600, 650, 700, 
750, 800, 850, 900, 950
]

rows = [
RowFull(0), RowFull(0), RowFull(0),
RowFull(0), RowFull(0), RowFull(0),
RowFull(0), RowFull(0), RowFull(0),
RowFull(0), RowFull(0), RowFull(0),
RowFull(0), RowFull(0), RowFull(0),
RowFull(0), RowFull(0), RowFull(0),
RowFull(0), RowFull(0)
]

# move direction
left = True
right = True
fall = True
speedUp = False
move = "none"
rotaNum = 1
rotate = False
vel = 0
test = 0
cool = 50
score = 0

# grid line
horGrid = []
verGrid = []
gridCol = "grey"

for hor in range(10):
	grid = pygame.Rect((50 * hor, 0, 3, 1000))
	horGrid.append(grid)

for ver in range(20):
	grid = pygame.Rect((0, 50 * ver, 500, 3))
	verGrid.append(grid)

# cheat
cheat = False
chtBox = "none"
box = pygame.Rect((550, 900, 100, 100))
chtTetri = [
pygame.Rect((10, 1050, 80, 80)),
pygame.Rect((95, 1050, 80, 80)),
pygame.Rect((180, 1050, 80, 80)),
pygame.Rect((265, 1050, 80, 80)),
pygame.Rect((350, 1050, 80, 80)),
pygame.Rect((435, 1050, 80, 80)),
pygame.Rect((520, 1050, 80, 80))
]
chtTetriName = [
textFont.render("O", 1, yellow),
textFont.render("I", 1, lightblue),
textFont.render("T", 1, purple), 
textFont.render("L", 1, orange),
textFont.render("J", 1, blue),
textFont.render("S", 1, green),
textFont.render("Z", 1, red)
]
chtTetriCoor = [
35, 115, 200, 290, 370, 460, 540
]

run = True

def cheatBox():
	global chtBox, vel
	
	chtLogo = textFont.render("C", 1, ("white"))
	
	pygame.draw.rect(screen, ("white"), (545, 895, 110, 110))
	pygame.draw.rect(screen, "black", box)
	screen.blit(chtLogo, (580, 920, 50, 50))
	
	if chtBox == "block":
		pygame.draw.rect(screen, ("black"), (0, 1005, 1000, 1000))
		vel = 0
		for x in chtTetri:
			pygame.draw.rect(screen, ("grey"), x)
		for y in range(7):
			screen.blit(chtTetriName[y], (chtTetriCoor[y], 1060, 50, 50))

def drawGrid():
	for grid in horGrid:
		pygame.draw.rect(screen, gridCol, grid)
	
	for grid in verGrid:
		pygame.draw.rect(screen, gridCol, grid)
	
def rotateTetri():
	global rotaNum, rotate
	
	if moveTetri[0].color == lightblue:
		if rotaNum == 1 and rotate:
			moveTetri[0].x -= 50
			moveTetri[0].y += 50
			moveTetri[2].x += 50
			moveTetri[2].y -= 50
			moveTetri[3].x += 100
			moveTetri[3].y -= 100
		if rotaNum == 2 and rotate:
			moveTetri[3].x -= 50
			moveTetri[3].y -= 50
			moveTetri[1].x += 50
			moveTetri[1].y += 50
			moveTetri[0].x += 100
			moveTetri[0].y += 100
		if rotaNum == 3 and rotate:
			moveTetri[0].x += 50
			moveTetri[0].y -= 50
			moveTetri[2].x -= 50
			moveTetri[2].y += 50
			moveTetri[3].x -= 100
			moveTetri[3].y += 100
		if rotaNum == 4 and rotate:
			moveTetri[3].x += 50
			moveTetri[3].y += 50
			moveTetri[1].x -= 50
			moveTetri[1].y -= 50
			moveTetri[0].x -= 100
			moveTetri[0].y -= 100
		
	if moveTetri[0].color == purple:
		if rotaNum == 1 and rotate:
			moveTetri[3].x += 50
			moveTetri[3].y -= 50
			moveTetri[2].x += 50
			moveTetri[2].y += 50
			moveTetri[0].x -= 50
			moveTetri[0].y += 50
		if rotaNum == 2 and rotate:
			moveTetri[3].x -= 50
			moveTetri[3].y += 50
		if rotaNum == 3 and rotate:
			moveTetri[2].x -= 50
			moveTetri[2].y -= 50
		if rotaNum == 4 and rotate:
			moveTetri[0].x += 50
			moveTetri[0].y -= 50
			
	if moveTetri[0].color == orange:
		if rotaNum == 1 and rotate:
			moveTetri[3].x += 50
			moveTetri[3].y -= 50
			moveTetri[0].x -= 50
			moveTetri[0].y += 50
			moveTetri[1].y += 100
		if rotaNum == 2 and rotate:
			moveTetri[3].x += 50
			moveTetri[3].y += 50
			moveTetri[0].x -= 50
			moveTetri[0].y -= 50
			moveTetri[1].x -= 100
		if rotaNum == 3 and rotate:
			moveTetri[3].x -= 50
			moveTetri[3].y += 50
			moveTetri[0].x += 50
			moveTetri[0].y -= 50
			moveTetri[1].y -= 100
		if rotaNum == 4 and rotate:
			moveTetri[3].x -= 50
			moveTetri[3].y -= 50
			moveTetri[0].x += 50
			moveTetri[0].y += 50
			moveTetri[1].x += 100
			
	if moveTetri[0].color == blue:
		if rotaNum == 1 and rotate:
			moveTetri[3].x += 50
			moveTetri[3].y -= 50
			moveTetri[1].x -= 50
			moveTetri[1].y += 50
			moveTetri[0].x -= 100
		if rotaNum == 2 and rotate:
			moveTetri[3].x += 50
			moveTetri[3].y += 50
			moveTetri[1].x -= 50
			moveTetri[1].y -= 50
			moveTetri[0].y -= 100
		if rotaNum == 3 and rotate:
			moveTetri[3].x -= 50
			moveTetri[3].y += 50
			moveTetri[1].x += 50
			moveTetri[1].y -= 50
			moveTetri[0].x += 100
		if rotaNum == 4 and rotate:
			moveTetri[3].x -= 50
			moveTetri[3].y -= 50
			moveTetri[1].x += 50
			moveTetri[1].y += 50
			moveTetri[0].y += 100
			
	if moveTetri[0].color == green:
		if rotaNum == 1 and rotate:
			moveTetri[3].x += 50
			moveTetri[3].y -= 50
			moveTetri[1].x += 50
			moveTetri[1].y += 50
			moveTetri[0].y += 100
		if rotaNum == 2 and rotate:
			moveTetri[3].y += 100
			moveTetri[0].x -=100
		if rotaNum == 3 and rotate:
			moveTetri[3].x -= 50
			moveTetri[3].y -= 50
			moveTetri[1].x -= 50
			moveTetri[1].y += 50
			moveTetri[0].y -= 100
		if rotaNum == 4 and rotate:
			moveTetri[1].y -= 100
			moveTetri[0].x += 100
			
	if moveTetri[0].color == red:
		if rotaNum == 1 and rotate:
			moveTetri[0].y += 100
			moveTetri[3].x += 100
		if rotaNum == 2 and rotate:
			moveTetri[2].x -= 100
			moveTetri[3].y += 100
		if rotaNum == 3 and rotate:
			moveTetri[0].y -= 100
			moveTetri[3].x -= 100
		if rotaNum == 4 and rotate:
			moveTetri[2].x += 100
			moveTetri[3].y -= 100
			
	for a in moveTetri:
		for b in blockTetri:
			if a.x == b.x and a.y == b.y:
				if rotaNum == 1:
					rotaNum = 4
				else:
					rotaNum -= 1
				moveTetri[0].x = idx0[0]
				moveTetri[0].y = idx0[1]
				moveTetri[1].x = idx1[0]
				moveTetri[1].y = idx1[1]
				moveTetri[2].x = idx2[0]
				moveTetri[2].y = idx2[1]
				moveTetri[3].x = idx3[0]
				moveTetri[3].y = idx3[1]
		if a.y > 950:
			rotaNum -= 1
			moveTetri[0].x = idx0[0]
			moveTetri[0].y = idx0[1]
			moveTetri[1].x = idx1[0]
			moveTetri[1].y = idx1[1]
			moveTetri[2].x = idx2[0]
			moveTetri[2].y = idx2[1]
			moveTetri[3].x = idx3[0]
			moveTetri[3].y = idx3[1]
			
	rotate = False
	
def nextDis():
	if ranShape[2][0] == yellow:
		for a in display_O:
			pygame.draw.rect(screen, yellow, a)
	if ranShape[2][0] == lightblue:
		for a in display_I:
			pygame.draw.rect(screen, lightblue, a)
	if ranShape[2][0] == purple:
		for a in display_T:
			pygame.draw.rect(screen, purple, a)
	if ranShape[2][0] == orange:
		for a in display_L:
			pygame.draw.rect(screen, orange, a)
	if ranShape[2][0] == blue:
		for a in display_J:
			pygame.draw.rect(screen, blue, a)
			
	if ranShape[2][0] == green:
		for a in display_S:
			pygame.draw.rect(screen, green, a)
			
	if ranShape[2][0] == red:
		for a in display_Z:
			pygame.draw.rect(screen, red, a)

def removeBlock():
	global score
	
	for a in range(len(blockTetri)):
		if blockTetri[a].y == 2000:
			blockTetri.pop(a)
			score += 10
			break

def rowFull():
	
	for block in blockTetri:
		for x in range(20):
			if block.y == reRow[x]:
				rows[x].num += 1
				if rows[x].num >= 10:
					for re in blockTetri:
						if re.y == reRow[x]:
							re.y = 2000
	
	for z in range(len(rows)):
		if rows[z].num == 10:
			for y in blockTetri:
				if y.y < reRow[z]:
					y.y += 50
	
	for x in rows:
		x.num = 0

def blockAppend():
	global fall, ranShape, rotaNum, cool, preStore
	
	for z in moveTetri:
		block = Tetrimino(z.x, z.y, z.color)
		blockTetri.append(block)
	
	for n in range(len(moveTetri)):
		moveTetri[n].x = ranShape[0][n]
		moveTetri[n].y = ranShape[1][n]
		moveTetri[n].color = ranShape[2][0]
	fall = True
	cool = 50
	preStore = ranShape
	ranShape = random.choice(allShapes)
	
	if ranShape == preStore:
		if ranShape == allShapes[0]:
			ranShape = allShapes[1]
		elif ranShape == allShapes[1]:
			ranShape = allShapes[2]
		elif ranShape == allShapes[2]:
			ranShape = allShapes[3]
		elif ranShape == allShapes[3]:
			ranShape = allShapes[4]
		elif ranShape == allShapes[4]:
			ranShape = allShapes[5]
		elif ranShape == allShapes[5]:
			ranShape = allShapes[6]
		elif ranShape == allShapes[6]:
			ranShape = allShapes[0]
	
	rotaNum = 1
	
def tetrimino():
	global right, left, fall, vel, test, move, cool, speedUp, rotate, rotaNum
	
	textScore = textFont.render(f"Score: {score}", 1, ("black"))
	#text = textFont.render(str(idx0), True, ("black"))
#	text2 = textFont.render(str(rotaNum), True, ("black"))
#	text3 = textFont.render(str(rotaNum), True, ("black"))
	
	for tetri in moveTetri:
		if tetri.x >= 500:
			for tet in moveTetri:
				tet.x -= 50
		if tetri.x <= -50:
			for tet in moveTetri:
				tet.x += 50
	
	for tetri in moveTetri:
		for block in blockTetri:
			if tetri.x == block.x and tetri.y == block.y and move == "right":
				for tet in moveTetri:
						tet.x -= 50
						move = "none"
			if tetri.x == block.x and tetri.y == block.y and move == "left":
				for tet in moveTetri:
						tet.x += 50
						move = "none"
						
	for tetri in moveTetri:
		if tetri.y > 950:
			for x in moveTetri:
				x.y -= 50
				
	for tetri in moveTetri:
		pygame.draw.rect(screen, tetri.color, (tetri.x, tetri.y, tetri.w, tetri.h))
		
	for tetri in blockTetri:
		pygame.draw.rect(screen, tetri.color, (tetri.x, tetri.y, tetri.w, tetri.h))
		
	screen.blit(textScore, (20, 1030))
	#screen.blit(text, (100, 1350))
#	screen.blit(text2, (570, 1350))
#	screen.blit(text3, (330, 1350))
	
	for x in blockTetri:
		if x.y <= 0:
			pygame.quit()
			
	rowFull()
	removeBlock()
	nextDis()
	
	for a in moveTetri:
		for b in blockTetri:
			if a.x == b.x and a.y + 50 == b.y:
				speedUp = False
				
	if not rotate:
		idx0[0], idx0[1] = moveTetri[0].x, moveTetri[0].y
		idx1[0], idx1[1] = moveTetri[1].x, moveTetri[1].y
		idx2[0], idx2[1] = moveTetri[2].x, moveTetri[2].y
		idx3[0], idx3[1] = moveTetri[3].x, moveTetri[3].y
	
	if speedUp:
		cool = 5
	
	vel += 1
	for tetri in moveTetri:
		if tetri.y <= 950 and vel >= cool and fall:
			vel = 0
			for tet in moveTetri:
				tet.y += 50
		if tetri.y >= 950:
			fall = False
			if vel >= cool:
				blockAppend()
				test += 1
				vel = 0
				rotate = False
		for block in blockTetri:
			if tetri.y + 50 == block.y and tetri.x == block.x:
				fall = False
				if vel >= cool:
					blockAppend()
					test += 1
					vel = 0
			elif vel >= cool + 10:
				vel = 0
				for tet in moveTetri:
					tet.y += 50

while run:
	for ev in pygame.event.get():
		if ev.type == pygame.QUIT:
			pygame.quit()
		if ev.type == pygame.MOUSEBUTTONDOWN:
			if rightButton.collidepoint(ev.pos) and right and chtBox == "none":
				move = "right"
				for tetri in moveTetri:
					tetri.x += 50
			if leftButton.collidepoint(ev.pos) and left and chtBox == "none":
				move = "left"
				for tetri in moveTetri:
					tetri.x -= 50
			if rotateButton.collidepoint(ev.pos) and chtBox == "none":
				rotate = True
				rotaNum += 1
				if rotaNum > 4:
					rotaNum = 1
					rotateTetri()
				rotateTetri()
			if speedButton.collidepoint(ev.pos) and chtBox == "none":
				speedUp = True
			if box.collidepoint(ev.pos):
				if chtBox == "none":
					chtBox = "block"
				elif chtBox == "block":
					chtBox = "none"
		
		if ev.type == pygame.MOUSEBUTTONUP:
			if speedUp:
				speedUp = False
				cool = 50
			
	screen.fill((50, 50, 50))	
	pygame.draw.rect(screen, ("grey"), (0, 1000, 1000, 1000))
	pygame.draw.rect(screen, ("grey"), (500, 0, 1000, 2000))
	screen.blit(textNext, (525, 300))
	pygame.draw.rect(screen, ("white"), (515, 355, 190, 210))
	pygame.draw.rect(screen, ("black"), (520, 360, 180, 200))
	pygame.draw.rect(screen, ("white"), (0, 1000, 500, 5))
	pygame.draw.rect(screen, ("white"), (500, 0, 5, 1000))
		
	pygame.draw.rect(screen, ("black"), leftButton, 0, 20)
	pygame.draw.rect(screen, ("black"), rightButton, 0, 20)
	pygame.draw.rect(screen, ("black"), rotateButton, 0, 20)
	pygame.draw.rect(screen, ("black"), speedButton, 0, 20)
	
	tetrimino()
	drawGrid()
	if cheat:
		cheatBox()
	
	pygame.display.update()