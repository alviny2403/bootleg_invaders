let state= 1; 

let enemyShipArray= [], 
    bulletArray= [];

// Game starting values and statistics
let myShipX= 250, 
    myShipY= 350, 
    userScore= 150, 
    enemiesLeft= 50, 
    bulletsFired= 0, 
    bulletsHit= 0;

function setup(){
    createCanvas(500, 500);
    rectMode(CENTER);
}

// "Enemy" generation
class EnemyShip{
    constructor(x, y, r, g, b, radius, speed){
        this.xPos= x;
        this.yPos= y;
        this.redValue= r;
        this.greenValue= g;
        this.blueValue= b;
        this.radius= radius;
        this.speed= speed;
    }
}

// Bullet generation
class Projectile{
    constructor(x, y, speed){
        this.xPos= x;
        this.yPos= y;
        this.speed= speed;
    }
}

function draw(){
    // Start screen
    if (state == 1){
        background(0);
        fill(255);
        stroke(255,0,0);
        strokeWeight(5);
        rect(250,350,200,100);
        fill(255,0,0);
        noStroke();
        textSize(35);
        text("Start Game",160,362);
        text("BOOTLEG INVADERS\n__________________", 75,190);
    }

    // Game screen
    if (state == 2){
        background(0);
        stroke(0);
        strokeWeight(1);
        fill(0,0,255);
        rect(450,450,100,100);

        // Create "enemies" using values stored in the array
        for (let i= 0; i< enemyShipArray.length; i++){
            fill(
                enemyShipArray[i].redValue, 
                enemyShipArray[i].greenValue, 
                enemyShipArray[i].blueValue
            );
            ellipse(
                enemyShipArray[i].xPos, 
                enemyShipArray[i].yPos, 
                enemyShipArray[i].radius, 
                enemyShipArray[i].radius
            );
            enemyShipArray[i].xPos+= enemyShipArray[i].speed;

            if (enemyShipArray[i].xPos > 475 || enemyShipArray[i].xPos < 25){
                enemyShipArray[i].speed*= -1;
            }
        }

        // Your spaceship
        fill(35,120,200);
        rect(myShipX,myShipY-20,5,30);
        quad(
            myShipX,
            myShipY- 25,
            myShipX- 40,
            myShipY+ 25,
            myShipX,
            myShipY+ 10,
            myShipX+ 40,
            myShipY+ 25
        );
        fill(255,0,0);
        ellipse(myShipX, myShipY, 25, 45);

        // Movement of your ship (WASD to move)
        if (keyIsDown(87)){
            myShipY-= 2;
        }
        if (keyIsDown(83)){
            myShipY+= 2;
        }
        if (keyIsDown(65)){
            myShipX-= 2;
        }
        if (keyIsDown(68)){
            myShipX+= 2;
        }

        // Boundaries of the ship
        if (myShipY > 375){
            myShipY = 375;
        }
        if (myShipY < 260){
            myShipY= 260;
        }
        if (myShipX > 460){
            myShipX= 460;
        }
        if (myShipX < 40){
            myShipX= 40;
        }

        // Generate bullet
        for (let i= 0; i< bulletArray.length; i++){
            fill(255)
            ellipse(bulletArray[i].xPos,bulletArray[i].yPos,5,8);
            bulletArray[i].yPos-= bulletArray[i].speed;
            
            // Delete bullet and enemy entity when in contact
            for (let j= 0; j< enemyShipArray.length; j++){
                if (
                    dist(
                        bulletArray[i].xPos, 
                        bulletArray[i].yPos, 
                        enemyShipArray[j].xPos, 
                        enemyShipArray[j].yPos
                    ) < 
                    enemyShipArray[j].radius/ 2
                ){
                    enemyShipArray.splice(j,1);
                    bulletArray.splice(i,1);
                    enemiesLeft-- ;
                    bulletsHit++ ;
                    break;
                }
            }
        }

        // Display data
        fill(255);
        textSize(20);
        text("Evil Balloons left: "+enemiesLeft, 25,475);
        text("Bullets hit: "+bulletsHit, 25, 450);
        text("Shots fired: "+bulletsFired, 25, 425);
        text("Press\nEnter\nTo Shoot", 410,430);

        if (enemiesLeft == 0){
            bulletArray.splice(0,bulletArray.length);
            state= 3;
        }
    }

    // Post-game screen
    if (state == 3){
        background(0);
        fill(0);
        stroke(255,0,0);
        rect(250,250,265,75);
        fill(255);
        strokeWeight(3);
        rect(250,350,124,50);

        fill(255,0,0);
        noStroke();
        textSize(50);
        text("Score: "+userScore,135,268);
        textSize(30);
        text("Restart",200,362);
    }
}

function keyPressed(){
    if (key == ' '){
        // Generates a bullet for "Shoot Bullet" button
        let tempBullet= new Projectile(myShipX, myShipY- 35, 5);
        bulletArray.push(tempBullet);
        userScore-- ;
        bulletsFired++ ;
    }
}

function mouseClicked(){
    if (state == 1){
        // Start the game
        if (mouseX < 350 && mouseX > 150 && mouseY < 400 && mouseY > 300){
            state= 2;
        }

        // Create 50 "enemies"(circles) with randomized attributes
        // Load the "enemies" into an array
        for (let i= 0; i< 50; i++){
            let tempShip= new EnemyShip(
                random(25, 475),
                random(25,200),
                random(0,255),
                random(0,255),
                random(0,255),
                random(25,50),
                random(-3,3)
            );
            enemyShipArray.push(tempShip);
        }
    }

    if (state == 3){
        // Send the game back to the start screen
        if (mouseX < 312 && mouseX > 188 && mouseY < 375 && mouseY > 325){
            state= 1;

            // Reset all stats from the previous game
            myShipX= 250, 
            myShipY= 350, 
            userScore= 150, 
            enemiesLeft= 50, 
            bulletsFired= 0, 
            bulletsHit= 0;
        }
    }
}
