
//Player-1 variables
var snakeP1;  
var sp1geometry;
var sp1material;
var moveP1Up=false;
var moveP1Down=false;
var moveP1Right=false;
var moveP1Left=false;
var P1Score=0;
var snakeP1arr=[];
var P1Collision=0;

// Player-2 variables
var snakeP2;  
var sp2geometry;
var sp2material;
var moveP2Up=false;
var moveP2Down=false;
var moveP2Right=false;
var moveP2Left=false;
var P2Score=0;
var snakeP2arr=[];
var P2Collision=0;

//Non player snake variables
var npSnake; 
var ngeometry; 		//np snake geometry
var nmaterial;
var moveNPUp=false;
var moveNPDown=false;
var moveNPRight=false;
var moveNPLeft=false;
var NPScore=0;
var snakeNParr=[];

var food;
var stop=false;
var countFrame=0;

var camera;  
var mode= false; //true : turn off collisions false: turn on collisions
var collisionTrack="collision.ogv";
var bgTrack="main.ogv";
var scene = new THREE.Scene();
		//np snake material
var music= false;
var usize=10;  //unit size
var snakeCount=0;
var pwidth=30;
var last,first;
var bgsound;
var csound;
var listener1;
var audioLoader1;

function setFalse(direction){
	return false
}
function setTrue(direction){
	return true
}

//Function to check the current movement of Player-1
function checkP1Movement(){
	if(moveP1Up){
		return 'u'
	}
	else if(moveP1Down){
		return 'd'
	}
	else if(moveP1Right){
		return 'r'
	}
	else if(moveP1Left){
		return 'l'
	}
}

//Function to check the current movement of Player-2
function checkP2Movement(){
	if(moveP2Up){
		return 'u'
	}
	else if(moveP2Down){
		return 'd'
	}
	else if(moveP2Right){
		return 'r'
	}
	else if(moveP2Left){
		return 'l'
	}
}
function change(){
	collisionMode=True

}
function playBackgroundMusic(){
	 		 listener1 = new THREE.AudioListener();
			camera.add( listener1 );

			// create a global audio source
			 bgsound = new THREE.Audio( listener1 );

			// load a sound and set it as the Audio object's buffer
			audioLoader1 = new THREE.AudioLoader();
			audioLoader1.crossOrigin = ' ';
			audioLoader1.load( bgTrack, function( buffer ) {
				bgsound.setBuffer( buffer );
				bgsound.setLoop( true );
				bgsound.setVolume( 10 );
				bgsound.play();
			});
}

//Function to check the current movement of Non-player Snake
function checkNPMovement(){
	if(moveNPUp){
		return 'u'
	}
	else if(moveNPDown){
		return 'd'
	}
	else if(moveNPRight){
		return 'r'
	}
	else if(moveNPLeft){
		return 'l'
	}
}

//Function to set the direction of Non Player Snake
function getNPDirection(){
	direction=Math.floor(Math.random()*3);
	switch(direction){
        case 0:
        if(!moveNPRight){
        	moveNPLeft = setTrue(moveNPLeft);
        	moveNPRight = setFalse(moveNPRight);
        	moveNPUp = 	setFalse(moveNPUp);
        	moveNPDown = setFalse(moveNPDown);
        	//stop =setFalse(stop);
        	return;
        }
        case 1:
        if(!moveNPLeft){
        	moveNPRight = setTrue(moveNPRight);
        	moveNPLeft = setFalse(moveNPLeft);
        	moveNPUp = setFalse(moveNPUp);
        	moveNPDown = setFalse(moveNPDown);
        	//stop =setFalse(stop);
        	return;
        }
        case 2:
        if(!moveNPDown){
        	moveNPUp= setTrue(moveNPUp);
        	moveNPDown = setFalse(moveNPDown);
        	moveNPRight = setFalse(moveNPRight);
        	moveNPLeft = setFalse(moveNPLeft);
        	return;
        	}
        case 3:
        if(!moveNPUp){
        	moveNPDown = setTrue(moveNPDown);
        	moveNPUp =   setFalse(moveNPUp);
        	moveNPRight = setFalse(moveNPRight);
        	moveNPLeft = setFalse(moveNPLeft);
        	//stop=setFalse(stop);
		return; 
		}
	
	}
}

//Function to randomly move food in the playing field  
function moveFood(){
	var y=Math.floor(Math.random()*usize);
	var x= Math.floor(Math.random()*usize);
	//console.log(x,y);
	food.position.x=Math.floor((Math.random()*14))*10;
	food.position.y=Math.floor((Math.random()*7))*10;
	if(x>5){
		food.position.x*=-1;
	}
	if(y>5){
		food.position.y*=-1;
	}

}

//Function to maintain the speed of the snake 
function slowDown(){
	for(var i=0;i<=10000000;)
	{
		i+=0.2;
	}
}

// Function to set default value of Player-1 
function setP1Default(){
	 moveP1Up= false;
	 moveP1Down= false;
	 moveP1Right= false;
	 moveP1Left= false;
	 P1Score=0;
	 P1Collision=0;
	 for(var i=0; i<snakeP1arr.length;i++)
	 {
		scene.remove(snakeP1arr[i]);
		}
	 snakeP1arr=[];
}

//Function to set default value of Player-2
function setP2Default(){
	 moveP2Up= false;
	 moveP2Down= false;
	 moveP2Right= false;
	 moveP2Left= false;
	 P2Score=0;
	 P2Collision=0;
	 for(var i=0; i<snakeP2arr.length;i++)
	 {
		scene.remove(snakeP2arr[i]);
		}
	 snakeP2arr=[];
}

//Function to set default value of Non-Player
function setNPDefault(){
	 moveNPUp=false;
	 moevNPDown=false;
	 moveNPRight=false;
	 moveNPLeft=false;
	 NPScore=0;

	 for(var i=0; i<snakeNParr.length;i++)
	 {
		scene.remove(snakeNParr[i]);
		}
	 snakeNParr=[];
}

//Function to generate Player-1 snake
function generateP1Snake(){
	sP1geometry = new THREE.BoxGeometry( usize, usize, usize );
	sP1material = new THREE.MeshBasicMaterial( { color:  0xffffff } );
	snakeP1 = new THREE.Mesh( sP1geometry, sP1material );
	snakeP1.position.x=-10;
	snakeP1.position.y=0;
	scene.add(snakeP1);
	snakeP1arr.push(snakeP1);
	slowDown();

}
//Function to generate Player-2 snake
function generateP2Snake(){
	sP2geometry = new THREE.BoxGeometry( usize, usize, usize );
	sP2material = new THREE.MeshBasicMaterial( { color:  0x0000ff } );
	snakeP2 = new THREE.Mesh( sP2geometry, sP2material );
	snakeP2.position.x=10;
	snakeP2.position.y=0;
	scene.add(snakeP2);
	snakeP2arr.push(snakeP2);
	slowDown();

}
function generateNPSnake(){
	npgeometry = new THREE.BoxGeometry( usize, usize, usize );
	npmaterial = new THREE.MeshBasicMaterial( { color:  0xff0000 } );
	npsnake = new THREE.Mesh( npgeometry, npmaterial );
	npsnake.position.x=20;
	npsnake.position.y=-20;
	scene.add(npsnake);
	snakeNParr.push(npsnake);
}

//Function to check self collsion for Player-1
function selfP1Collision(){
	first=snakeP1arr[0];
	for(var i=1;i<snakeP1arr.length;i++)
		{
			if(first.position.x== snakeP1arr[i].position.x && first.position.y== snakeP1arr[i].position.y)
				{	
					return true;
				}
		}
	return false;
}

//Function to check self collsion for Player-2
function selfP2Collision(){
	first=snakeP2arr[0];
	for(var i=1;i<snakeP2arr.length;i++)
		{
			if(first.position.x== snakeP2arr[i].position.x && first.position.y== snakeP2arr[i].position.y)
				{	
					return true;
				}
		}
	return false;
}

//Function to check self collsion for Non-Player snake
function selfNPCollision(){
	first=snakeNParr[0];
	for(var i=1;i<snakeNParr.length;i++)
		{
			if(first.position.x== snakeNParr[i].position.x && first.position.y== snakeNParr[i].position.y)
				{	
					return true;
				}
		}
	return false;
}

//Function to check collision with other players
function checkP1CollisonWithOtherPlayer(){
	first=snakeP1arr[0];
	for(var i=0;i<snakeNParr.length;i++)
		{
			if(first.position.x== snakeNParr[i].position.x && first.position.y== snakeNParr[i].position.y)
				{	
					return true;
				}
		}
	for(var i=0;i<snakeP2arr.length;i++)
	{
		if(first.position.x== snakeP2arr[i].position.x && first.position.y== snakeP2arr[i].position.y)
				{	
					return true;
				}

	}
	return false;
}

//Function to check collision with other players
function checkP2CollisonWithOtherPlayer(){
	first=snakeP2arr[0];
	for(var i=0;i<snakeNParr.length;i++)
		{
			if(first.position.x== snakeNParr[i].position.x && first.position.y== snakeNParr[i].position.y)
				{	
					return true;
				}
		}
	for(var i=0;i<snakeP1arr.length;i++)
	{
		if(first.position.x== snakeP1arr[i].position.x && first.position.y== snakeP1arr[i].position.y)
				{	
					return true;
				}

	}
	return false;
}

function checkCollisonWithMainPlayer(){
	first=snakeNParr[0];
	for(var i=0;i<snakeP1arr.length;i++)
		{
			if(first.position.x== snakeP1arr[i].position.x && first.position.y== snakeP1arr[i].position.y)
				{	
					return true;
				}
		}
	for(var i=0;i<snakeP2arr.length;i++)
		{
			if(first.position.x== snakeP2arr[i].position.x && first.position.y== snakeP2arr[i].position.y)
				{	
					return true;
				}

		}
	return false;
}

//Function to check whether Player-1 ate the food or not
function P1EatFood(){
	 first=snakeP1arr[0];
	if (food.position.x == first.position.x  && food.position.y== first.position.y)
	{
		P1Score+=1;
		increaseP1Length(food.position.x,food.position.y,checkP1Movement());
		moveFood();	
	}
}
//Function to check whether Player-2 ate the food or not
function P2EatFood(){
	 first=snakeP2arr[0];
	if (food.position.x == first.position.x  && food.position.y== first.position.y)
	{
		P2Score+=1;
		increaseP2Length(food.position.x,food.position.y,checkP2Movement());
		moveFood();	
	}
}

function NPEatFood(){
	 first=snakeNParr[0];
	if (food.position.x == first.position.x  && food.position.y== first.position.y)
	{
		//NPScore+=1;
		increaseNPLength(food.position.x,food.position.y,checkNPMovement());
		moveFood();	
	}
}

//Function to randomly move Non-Player snake in the playing field 
function moveNPsnake(){
	if(countFrame%10==0){
	direction=getNPDirection();
	}
	last=snakeNParr[snakeNParr.length-1];
	first=snakeNParr[0];
	if (moveNPUp){
			last.position.y=first.position.y+usize;
			last.position.x=first.position.x;
			snakeNParr.pop();
			snakeNParr.unshift(last);
			checkNPCollision();
	}
	else if(moveNPDown){
			last.position.y=first.position.y-usize;
			last.position.x=first.position.x
			snakeNParr.pop();
			snakeNParr.unshift(last);
			checkNPCollision();
			}
	else if(moveNPLeft){
			last.position.y=first.position.y;
			last.position.x=first.position.x-usize;
			snakeNParr.pop();
			snakeNParr.unshift(last);	
			checkNPCollision();
		}	
	else if(moveNPRight){
			last.position.y = first.position.y;
			last.position.x = first.position.x+usize;
			snakeNParr.pop();
			snakeNParr.unshift(last);
			checkNPCollision();
	}

}

//Function to move Player-1 snake 
function renderP1(){
		last=snakeP1arr[snakeP1arr.length-1];
		 first=snakeP1arr[0];
	if (moveP1Up){

			
			last.position.y=first.position.y+usize;
			last.position.x=first.position.x;
			snakeP1arr.pop();
			snakeP1arr.unshift(last);
			checkP1Collision();
	}
	else if(moveP1Down){

			last.position.y=first.position.y-usize;
			last.position.x=first.position.x
			snakeP1arr.pop();
			snakeP1arr.unshift(last);
			checkP1Collision();
			}
	else if(moveP1Left){
			
			last.position.y=first.position.y;
			last.position.x=first.position.x-usize;
			snakeP1arr.pop();
			snakeP1arr.unshift(last);	
			checkP1Collision();
		}	
	else if(moveP1Right){
			last.position.y = first.position.y;
			last.position.x = first.position.x+usize;
			snakeP1arr.pop();
			snakeP1arr.unshift(last);
			checkP1Collision();
	}
	if(!moveP2Up &&  !moveP2Down && !moveP2Left && !moveP2Right && !moveP1Left && !moveP1Right && !moveP1Up && !moveP1Down && !music){
		playBackgroundMusic();
		music= true;
	}
	else if(moveP2Up || moveP2Down || moveP2Left || moveP2Right || moveP1Left || moveP1Right ||moveP1Up || moveP1Down || music){
		// slowDown();
		bgsound.setVolume(10);
	}
}

//Function to move Player-2 snake
function renderP2(){
		last=snakeP2arr[snakeP2arr.length-1];
		 first=snakeP2arr[0];
	if (moveP2Up){

			last.position.y=first.position.y+usize;
			last.position.x=first.position.x;
			snakeP2arr.pop();
			snakeP2arr.unshift(last);
			checkP2Collision();
	}
	else if(moveP2Down){

			
			last.position.y=first.position.y-usize;
			last.position.x=first.position.x
			snakeP2arr.pop();
			snakeP2arr.unshift(last);
			checkP2Collision();

			}
	else if(moveP2Left){
			
			last.position.y=first.position.y;
			last.position.x=first.position.x-usize;
			snakeP2arr.pop();
			snakeP2arr.unshift(last);	
			checkP2Collision();
		}	
	else if(moveP2Right){

			last.position.y = first.position.y;
			last.position.x = first.position.x+usize;
			snakeP2arr.pop();
			snakeP2arr.unshift(last);
			checkP2Collision();
	}
	if(!moveP2Up &&  !moveP2Down && !moveP2Left && !moveP2Right && !moveP1Left && !moveP1Right && !moveP1Up && !moveP1Down && !music){
		playBackgroundMusic();
		music= true;
	}
	else if(moveP2Up || moveP2Down || moveP2Left || moveP2Right || moveP1Left || moveP1Right ||moveP1Up || moveP1Down || music){
		// slowDown();
		bgsound.setVolume(10);
	}
}

//Function to check the collision of Non-Player snake
function checkNPCollision(){
	first = snakeNParr[0];
	if(first.position.y > 60  ){
			setNPDefault();
			generateNPSnake();
		}
		
	else if(first.position.y< -60  ){
			setNPDefault();
			generateNPSnake();
		}
	
	else if(first.position.x>130  ){
			
			setNPDefault();
			generateNPSnake();
		}
	else if(first.position.x<-130 ){
			
			setNPDefault();
			generateNPSnake();
	}
	else if(selfNPCollision()){
		
		setNPDefault();
		generateNPSnake();
	}
	else if(checkCollisonWithMainPlayer())
	{	
		setNPDefault();
		generateNPSnake();

	}
}

//Function to check the collision of Player-1 
function checkP1Collision(){
	first = snakeP1arr[0];
	if(first.position.y > 60  ){
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			bgsound.setVolume(0);
			setP1Default();
			generateP1Snake();
			
		}
		
	else if(first.position.y< -60  ){

			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			bgsound.setVolume(0);
			setP1Default();
			generateP1Snake();
		}

	
	else if(first.position.x>130  ){

			bgsound.setVolume(0);
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			setP1Default();
			generateP1Snake();
			
			}
	else if(first.position.x<-130 ){
			
			bgsound.setVolume(0);
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			setP1Default();
			generateP1Snake();
			
		}
	else if(selfP1Collision()){
			
			bgsound.setVolume(0);
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			setP1Default();
			generateP1Snake();
	}
	else if(checkP1CollisonWithOtherPlayer())
	{
			bgsound.setVolume(0);
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			setP1Default();
			generateP1Snake();
			
	}

}

//Function to check the collision of Player-2
function checkP2Collision(){
	first = snakeP2arr[0];
	if(first.position.y > 60  ){
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			bgsound.setVolume(0);
			setP2Default();
			generateP2Snake();
			
		}
		
	else if(first.position.y< -60  ){

			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			bgsound.setVolume(0);
			setP2Default();
			generateP2Snake();
		}

	
	else if(first.position.x>130  ){

			bgsound.setVolume(0);
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			setP2Default();
			generateP2Snake();
			
			}
	else if(first.position.x<-130 ){
			
			bgsound.setVolume(0);
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			setP2Default();
			generateP2Snake();
			
		}
	else if(selfP1Collision()){
			
			bgsound.setVolume(0);
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			setP2Default();
			generateP2Snake();
	}
	else if(checkP1CollisonWithOtherPlayer())
	{
			bgsound.setVolume(0);
			document.getElementById("scores").innerHTML = P1Score + "-" + P2Score;
			setP2Default();
			generateP2Snake();
			
	}

}

//Function to make the playing field
function displayPlayingField(){
	
	//Planar terrain
	var geometry = new THREE.PlaneGeometry( usize*30,usize*15 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00000 } );
	var plane = new THREE.Mesh( geometry, material );
	scene.add(plane);		

	//right wall
	var rwgeometry = new THREE.BoxGeometry( usize,usize*15,usize );
	var rwmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff} );
	var rwplane = new THREE.Mesh( rwgeometry, rwmaterial );
	scene.add(rwplane);
	rwplane.position.set(-15*usize,0,0);
	 
	 //upper wall
	var uwgeometry = new THREE.BoxGeometry( 30*usize,usize,usize );
	var uwmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	var uwplane = new THREE.Mesh( uwgeometry, uwmaterial );
	scene.add(uwplane)
	uwplane.position.set(0,7.5*usize,0);
   
	// bottom wall
	var lwgeometry = new THREE.BoxGeometry( 30*usize,usize ,usize);
	var lwmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	var lwplane = new THREE.Mesh( lwgeometry, lwmaterial );
	scene.add(lwplane);
	lwplane.position.set(0,-7.5*usize,0);
	
	//left wall
	var bwgeometry = new THREE.BoxGeometry( usize,15*usize,usize );
	var bwmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	var bwplane = new THREE.Mesh( bwgeometry, bwmaterial );
	scene.add(bwplane);
	bwplane.position.set(15*usize,0,0);

}

//Function to generate the food
function generateFood(){
	var fgeometry=new THREE.SphereGeometry(4);
	var fmaterial= new THREE.MeshBasicMaterial({ color: 0xffffff });
	food= new THREE.Mesh(fgeometry,fmaterial);
	scene.add(food);
	food.position.x=0;
	food.position.y=40;

}

//Main Function();
function main(){
			
	camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 0.1, 1000 );	
	camera.position.z = 200;			
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth , window.innerHeight);
	document.body.appendChild( renderer.domElement );
	var usize=10;
	
	//playing field
	displayPlayingField();

	// //right wall
	// var rwgeometry = new THREE.BoxGeometry( usize,usize*15,usize );
	// var rwmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff} );
	// var rwplane = new THREE.Mesh( rwgeometry, rwmaterial );
	// scene.add(rwplane);
	// rwplane.position.set(-15*usize,0,0);
	 
	//  //upper wall
	// var uwgeometry = new THREE.BoxGeometry( 30*usize,usize,usize );
	// var uwmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	// var uwplane = new THREE.Mesh( uwgeometry, uwmaterial );
	// scene.add(uwplane)
	// uwplane.position.set(0,7.5*usize,0);
   
	// // bottom wall
	// var lwgeometry = new THREE.BoxGeometry( 30*usize,usize ,usize);
	// var lwmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	// var lwplane = new THREE.Mesh( lwgeometry, lwmaterial );
	// scene.add(lwplane);
	// lwplane.position.set(0,-7.5*usize,0);
	
	// //left wall
	// var bwgeometry = new THREE.BoxGeometry( usize,15*usize,usize );
	// var bwmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	// var bwplane = new THREE.Mesh( bwgeometry, bwmaterial );
	// scene.add(bwplane);
	// bwplane.position.set(15*usize,0,0);
	
	//Snake
	generateP1Snake();
	generateP2Snake();
	
	//Non Player Snake
	generateNPSnake();
	
	//food
	generateFood();
	
	//animation 
	var animate= function animate(){
		requestAnimationFrame(animate);
		renderP1();
		renderP2();
		moveNPsnake();
		slowDown();
		countFrame+=1;
		P1EatFood();
		P2EatFood();
		NPEatFood();
		renderer.render( scene, camera );
	};
	animate();
}

//Function to increase the length of NP snake 
function increaseNPLength(x1,y1,checkMovement){
	var last=snakeNParr[snakeNParr.length-1];
	var sgeometry1 = new THREE.BoxGeometry( usize, usize, usize );
	var smaterial1 = new THREE.MeshBasicMaterial( { color:  0xff0000 } );
	var snake1 = new THREE.Mesh( sgeometry1, smaterial1 );
	scene.add(snake1);
	//snakeCount+=1;
	snakeNParr.push(snake1);
	
	if(checkMovement == 'r'){
		last.position.x+=usize;
		snake1.position.x=x1;
		snake1.position.y=y1;
	}
	else if(checkMovement == 'l'){
		last.position.x-=usize;
		snake1.position.x=x1;
		snake1.position.y=y1;
	}
	else if(checkMovement == 'u'){
		last.position.y+=usize;
		snake1.position.x=x1;
		snake1.position.y=y1;

	}
	else if(checkMovement == 'd'){
		last.position.y-=usize;
		snake1.position.x=x1;
		snake1.position.y=y1;
	}

}

//Function to increase the length of Player-1 snake 
function increaseP1Length(x1,y1,checkP1Movement){
	var last=snakeP1arr[snakeP1arr.length-1];
	var sP1geometry = new THREE.BoxGeometry( usize, usize, usize );
	var sP1material = new THREE.MeshBasicMaterial( { color:  0xffffff } );
	var snakeP1 = new THREE.Mesh( sP1geometry, sP1material );
	scene.add(snakeP1);
	snakeP1arr.push(snakeP1);
	
	if(checkP1Movement == 'r'){
		last.position.x+=usize;
		snakeP1.position.x=x1;
		snakeP1.position.y=y1;
	}
	else if(checkP1Movement == 'l'){
		last.position.x-=usize;
		snakeP1.position.x=x1;
		snakeP1.position.y=y1;
	}
	else if(checkP1Movement == 'u'){
		last.position.y+=usize;
		snakeP1.position.x=x1;
		snakeP1.position.y=y1;

	}
	else if(checkP1Movement == 'd'){
		last.position.y-=usize;
		snakeP1.position.x=x1;
		snakeP1.position.y=y1;
	}

}

//Function to increase the length of Player-2 snake 
function increaseP2Length(x1,y1,checkMovement){
	var last=snakeP2arr[snakeP2arr.length-1];
	var sP2geometry = new THREE.BoxGeometry( usize, usize, usize );
	var sP2material = new THREE.MeshBasicMaterial( { color:  0x0000ff } );
	var snakeP2 = new THREE.Mesh( sP2geometry, sP2material );
	scene.add(snakeP2);
	snakeP2arr.push(snakeP2);
	
	if(checkMovement == 'r'){
		last.position.x+=usize;
		snakeP2.position.x=x1;
		snakeP2.position.y=y1;
	}
	else if(checkMovement == 'l'){
		last.position.x-=usize;
		snakeP2.position.x=x1;
		snakeP2.position.y=y1;
	}
	else if(checkMovement == 'u'){
		last.position.y+=usize;
		snakeP2.position.x=x1;
		snakeP2.position.y=y1;

	}
	else if(checkMovement == 'd'){
		last.position.y-=usize;
		snakeP2.position.x=x1;
		snakeP2.position.y=y1;
	}

}

function changeView(event){
	 switch(event.key){
        case "a":
        if(!moveP1Right){
        	moveP1Left = setTrue(moveP1Left);
        	moveP1Right = setFalse(moveP1Right);
        	moveP1Up = 	setFalse(moveP1Up);
        	moveP1Down = setFalse(moveP1Down);
        	//stop =setFalse(stop);
        	return;
        }
        case "d" :
        if(!moveP1Left){
        	moveP1Right = setTrue(moveP1Right);
        	moveP1Left = setFalse(moveP1Left);
        	moveP1Up = setFalse(moveP1Up);
        	moveP1Down = setFalse(moveP1Down);
        	//stop =setFalse(stop);
        	return;
        }
        case "w":
        if(!moveP1Down){
        	moveP1Up= setTrue(moveP1Up);
        	moveP1Down = setFalse(moveP1Down);
        	moveP1Right = setFalse(moveP1Right);
        	moveP1Left = setFalse(moveP1Left);
        	return;
        	}
        case "s":
        if(!moveP1Up){
        	moveP1Down = setTrue(moveP1Down);
        	moveP1Up =   setFalse(moveP1Up);
        	moveP1Right = setFalse(moveP1Right);
        	moveP1Left = setFalse(moveP1Left);
        	//stop=setFalse(stop);
		return; 
		}
		case " ":
			stop=!stop;
			return;
		case "4":
		 if(!moveP2Right){
        	moveP2Left = setTrue(moveP2Left);
        	moveP2Right = setFalse(moveP2Right);
        	moveP2Up = 	setFalse(moveP2Up);
        	moveP2Down = setFalse(moveP2Down);
        	//stop =setFalse(stop);
        	return;
        }
         
	    case "6":
	         if(!moveP2Left){
        	moveP2Right = setTrue(moveP2Right);
        	moveP2Left = setFalse(moveP2Left);
        	moveP2Up = setFalse(moveP2Up);
        	moveP2Down = setFalse(moveP2Down);
        	//stop =setFalse(stop);
        	return;
        }
	    case "8": 
	    if(!moveP2Down){
        	moveP2Up= setTrue(moveP2Up);
        	moveP2Down = setFalse(moveP2Down);
        	moveP2Right = setFalse(moveP2Right);
        	moveP2Left = setFalse(moveP2Left);
        	return;
        	}      
	    case "2":
	    if(!moveP2Up){
	        	moveP2Down = setTrue(moveP2Down);
	        	moveP2Up =   setFalse(moveP2Up);
	        	moveP2Right = setFalse(moveP2Right);
	        	moveP2Left = setFalse(moveP2Left);
	        	//stop=setFalse(stop);
			return; 
			}
	    
	}
}
