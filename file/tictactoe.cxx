#include <stdio.h>
#include <stdlib.h>
#include <random>

char turn = 'p';
char winner = 'n';
char choice;
bool draw = true;

char pS = 'X';
char cS = 'O';

char map[3][3] = {
	{' ', ' ', ' '},
	{' ', ' ', ' '},
	{' ', ' ', ' '}
};

void gameEnd()
{
	printf("\n\tWould you like to play again? [Y/N] ");
	scanf("%c", &choice);
	
	choice = toupper(choice);
	
	if(choice == 'Y'){
		for(int i = 0; i < 3; i++){
			for(int j = 0; j < 3; j++){
				map[i][j] = ' ';
			}
		}
		winner = 'n';
		turn = 'p';
		system("cls");
	}
	else if(choice == 'N'){
		system("cls");
		printf("\tThank you for playing!\n");
		exit(EXIT_SUCCESS);
	}
}

void update()
{
	system("cls");
	
	printf("\t%c | %c | %c\n", map[0][0], map[0][1], map[0][2]);
	printf("\t--|---|--\n");
	printf("\t%c | %c | %c\n", map[1][0], map[1][1], map[1][2]);
	printf("\t--|---|--\n");
	printf("\t%c | %c | %c\n", map[2][0], map[2][1], map[2][2]);
}

void detectWinner()
{
	// detect draw
	for(int x = 0; x < 3; x++){
		for(int y = 0; y < 3; y++){
			if(map[x][y] == ' '){
				draw = false;
			}
		}
	}
	if(draw){
		winner = 'd';
	}
	else{
		draw = true;
	}
	
	// detect player
	// horizontal
	if(map[0][0] == pS and map[0][1] == pS and map[0][2] == pS){
		winner = 'p';
	}
	else if(map[1][0] == pS and map[1][1] == pS and map[1][2] == pS){
		winner = 'p';
	}
	else if(map[2][0] == pS and map[2][1] == pS and map[2][2] == pS){
		winner = 'p';
	}
	// vertical
	else if(map[0][0] == pS and map[1][0] == pS and map[2][0] == pS){
		winner = 'p';
	}
	else if(map[0][1] == pS and map[1][1] == pS and map[2][1] == pS){
		winner = 'p';
	}
	else if(map[0][2] == pS and map[1][2] == pS and map[2][2] == pS){
		winner = 'p';
	}
	// diagonal
	else if(map[0][0] == pS and map[1][1] == pS and map[2][2] == pS){
		winner = 'p';
	}
	else if(map[0][2] == pS and map[1][1] == pS and map[2][0] == pS){
		winner = 'p';
	}
	
	// detect computer
	// horizontal
	if(map[0][0] == cS and map[0][1] == cS and map[0][2] == cS){
		winner = 'c';
	}
	else if(map[1][0] == cS and map[1][1] == cS and map[1][2] == cS){
		winner = 'c';
	}
	else if(map[2][0] == cS and map[2][1] == cS and map[2][2] == cS){
		winner = 'c';
	}
	// vertical
	else if(map[0][0] == cS and map[1][0] == cS and map[2][0] == cS){
		winner = 'c';
	}
	else if(map[0][1] == cS and map[1][1] == cS and map[2][1] == cS){
		winner = 'c';
	}
	else if(map[0][2] == cS and map[1][2] == cS and map[2][2] == cS){
		winner = 'c';
	}
	// diagonal
	else if(map[0][0] == cS and map[1][1] == cS and map[2][2] == cS){
		winner = 'c';
	}
	else if(map[0][2] == cS and map[1][1] == cS and map[2][0] == cS){
		winner = 'c';
	}
}

void computerTurn()
{
	srand(time(0));
	
	int comChose1;
	int comChose2;
	
	comChose1 = (random() % 3) + 0;
	comChose2 = (random() % 3) + 0;
	
	while(true){
		if(map[comChose1][comChose2] == ' '){
			map[comChose1][comChose2] = cS;
			turn = 'p';
			break;
		}
		else{
			comChose1 = (random() % 3) + 0;
			comChose2 = (random() % 3) + 0;
		}
	}
}

int main()
{
	detectWinner();
	
	if(turn == 'c' and winner == 'n'){
		computerTurn();
	}
	
	update();
	
	char chose[3];
	
	if(winner == 'n'){
		printf("\n\tEnter: ");
	}
	else if(winner == 'p'){
		printf("\n\tYOU WIN!\n");
		gameEnd();
	}
	else if(winner == 'c'){
		printf("\n\tYOU LOSE!\n");
		gameEnd();
	}
	else if(winner == 'd'){
		printf("\n\tDRAW!\n");
		gameEnd();
	}
	
	if(winner == 'n'){
		fgets(chose, 3, stdin);
	}
	printf("\n");
	
	if(chose[0] == 'a' and chose[1] == '1'){
		if(map[0][0] == ' '){
			map[0][0] = pS;
			turn = 'c';
		}
	}
	else if(chose[0] == 'a' and chose[1] == '2'){
		if(map[0][1] == ' '){
			map[0][1] = pS;
			turn = 'c';
		}
	}
	else if(chose[0] == 'a' and chose[1] == '3'){
		if(map[0][2] == ' '){
			map[0][2] = pS;
			turn = 'c';
		}
	}
	else if(chose[0] == 'b' and chose[1] == '1'){
		if(map[1][0] == ' '){
			map[1][0] = pS;
			turn = 'c';
		}
	}
	else if(chose[0] == 'b' and chose[1] == '2'){
		if(map[1][1] == ' '){
			map[1][1] = pS;
			turn = 'c';
		}
	}
	else if(chose[0] == 'b' and chose[1] == '3'){
		if(map[1][2] == ' '){
			map[1][2] = pS;
			turn = 'c';
		}
	}
	else if(chose[0] == 'c' and chose[1] == '1'){
		if(map[2][0] == ' '){
			map[2][0] = pS;
			turn = 'c';
		}
	}
	else if(chose[0] == 'c' and chose[1] == '2'){
		if(map[2][1] == ' '){
			map[2][1] = pS;
			turn = 'c';
		}
	}
	else if(chose[0] == 'c' and chose[1] == '3'){
		if(map[2][2] == ' '){
			map[2][2] = pS;
			turn = 'c';
		}
	}
	else{
		main();
	}
	
	main();
}