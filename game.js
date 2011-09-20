var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var SPACE = 32;

var bindings = {};
var laccel = 1; // Linear acceleration
var aaccel = 5; // Angular acceleration
var max_laccel = 15;

function Spaceship() {
    this.vel_x = 0;
    this.vel_y = 0;
    this.angle = 0;
    this.vel = 0;
    this.image = null;
    var self = this;
    
    this.to_rad = function(deg) {
        return deg * Math.PI/180;
    }
    
    this.rotate = function(dir) {
        if (dir == LEFT) {
            this.angle += aaccel;
        } else {
            this.angle -= aaccel;
        }
        if (this.angle < 0)
            this.angle = 359;
        if (this.angle >= 360)
            this.angle = 0;
        
        this.image.style.webkitTransform = 'rotate(' + this.angle +'deg)';
        this.image.style.mozTransform = 'rotate(' + this.angle +'deg)';
        this.image.style.oTransform = 'rotate(' + this.angle +'deg)';
        this.image.style.msTransform = 'rotate(' + this.angle +'deg)';
    }
    
    this.accelerate = function(dir) {
        if (dir == UP) {
            this.vel -= laccel;
            if (this.vel < max_laccel)
                this.vel = -max_laccel;
        } else {
            this.vel += laccel;
            if (this.vel > max_laccel)
                this.vel = max_laccel;
        }
        this.vel_y = parseInt(this.vel * Math.sin(this.to_rad(this.angle)));
        this.vel_x = parseInt(this.vel * Math.cos(this.to_rad(this.angle)));
    }
    
    this.move = function(){
        var top = parseInt(this.image.style.top.replace('px', ''));
        if (isNaN(top))
            top = 0;
        top +=  this.vel_y;
        var left = parseInt(this.image.style.left.replace('px', '')) + this.vel_x;
        if (isNaN(left))
            left = 0;
        left += this.vel_x;
        console.log(this.vel_x, this.vel_y, this.image.style.top, this.image.style.left, top, left);
        
        /* Handle world margins */
        if (left <= -32)
            left = 599;
        else if (left >= 600)
            left = -31;
        if (top <= -32)
            top = 599;
        else if (top >= 600)
            top = -31;
        this.image.style.top = top + 'px';
        this.image.style.left = left + 'px';
    }
    
    this.start = setInterval(function() {self.move();}, 200);
}

function initialize() {
    container = document.getElementById('container');
    spaceship = new Spaceship();
    spaceship.image = document.getElementById('spaceship');
    
    game_width = parseInt(container.offsetWidth);
    game_height = parseInt(container.offsetHeight);
    console.log(spaceship.image.offsetLeft, spaceship.image.offsetTop, spaceship.vel_x, game_width, game_height, spaceship.image.offsetHeight);
    console.log(spaceship instanceof Spaceship);
    document.body.onkeydown = on_key_down;
}

function on_key_down(e) {
    var evtobj = window.event? event : e; //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var keycode = evtobj.charCode? evtobj.charCode : evtobj.keyCode;
    if (keycode == UP || keycode == DOWN) {
        spaceship.accelerate(keycode);
    } else if (keycode == LEFT || keycode == RIGHT) {
        spaceship.rotate(keycode);;
    } else if (keycode == SPACE) {
        console.log('Shoot');
    }
}

//function check_
window.onload = initialize;
