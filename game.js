var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var SPACE = 32;

var bindings = {};
var laccel = 1; // Linear acceleration
var aaccel = 5; // Angular acceleration
var max_laccel = 15;
var interval = 80;

function to_rad(deg) {
    return deg * Math.PI/180;
};

function move(){
    this.top +=  this.vel_y;
    this.left += this.vel_x;
    
    /* Handle world margins */
    if (this.left <= -(this.width))
        this.left = 599;
    else if (this.left >= 600)
        this.left = -(this.width - 1);
    if (this.top <= -(this.height))
        this.top = 599;
    else if (this.top >= 600)
        this.top = -(this.height - 1);
    
    this.image.style.webkitTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
    this.image.style.MozTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
    this.image.style.msTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
    this.image.style.transform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
};

function Spaceship(top_, left_) {
    this.vel = 0;
    this.vel_x = 0;
    this.vel_y = 0;
    this.angle = 0;
    this.width = 32;
    this.height = 32;
    this.image = document.getElementById('spaceship_img');
    this.container = document.getElementById('spaceship');
    
    var self = this;
    this.top = (isNaN(top_)) ? 0 : top_;
    this.left = (isNaN(left_)) ? 0 : left_;
    
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
        
        this.image.style.webkitTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
        this.image.style.MozTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
        this.image.style.msTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
        this.image.style.transform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
    };
    
    this.accelerate = function(dir) {
        if (dir == UP) {
            this.vel -= laccel;
            if (this.vel < -max_laccel)
                this.vel = -max_laccel;
        } else {
            this.vel += laccel;
            if (this.vel > max_laccel)
                this.vel = max_laccel;
        }
        
        this.vel_y = parseInt(this.vel * Math.sin(to_rad(this.angle)), 10);
        this.vel_x = parseInt(this.vel * Math.cos(to_rad(this.angle)), 10);
    };
    
    this.move = function(){
        this.top +=  this.vel_y;
        this.left += this.vel_x;
        
        /* Handle world margins */
        if (this.left <= -(this.width))
            this.left = 599;
        else if (this.left >= 600)
            this.left = -(this.width - 1);
        if (this.top <= -(this.height))
            this.top = 599;
        else if (this.top >= 600)
            this.top = -(this.height - 1);
        //console.log(this.top, this.left, this.angle, this.width, this.height);
        this.image.style.webkitTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
        this.image.style.MozTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
        this.image.style.msTransform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
        this.image.style.transform = 'translate(' + this.left + 'px, ' + this.top + 'px) rotate(' + this.angle +'deg)';
    }
    
    this.start = setInterval(function() {self.move();}, interval);
}

function Meteor(id) {
    this.angle = Math.floor(Math.random() * 359);
    this.vel = Math.floor(Math.random() * 9) + 1;
    this.vel_y = parseInt(this.vel * Math.sin(to_rad(this.angle)), 10);
    this.vel_x = parseInt(this.vel * Math.cos(to_rad(this.angle)), 10);
    this.top = Math.floor(Math.random() * 359);
    this.left = Math.floor(Math.random() * 359);
    this.width = 64;
    this.height = 64;
    var self = this;
    
    this.container = document.createElement('div');
    this.container.setAttribute('id', 'meteor_' + id);
    this.container.setAttribute('class', 'meteor');
    this.image = document.createElement('img');
    this.image.setAttribute('src', 'big-rock.png');
    this.container.appendChild(this.image);
    document.getElementById('container').appendChild(this.container);
    
    this.move = move;
    this.start = setInterval(function() {self.move();}, interval);
    self.move();
}

function initialize() {
    container = document.getElementById('container');
    spaceship = new Spaceship(0, 0);
    meteors = []
    for(var i=0; i < 5; i++) {
        meteors.push(new Meteor(i));
    }
    //document.onkeypress = on_key_down;
    document.onkeydown = on_key_down;
}

function on_key_down(e) {
    console.log(e);
    var evtobj = window.event? event : e; //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var keycode = evtobj.charCode? evtobj.charCode : evtobj.keyCode;
    /*
    if (window.event) { // eg. IE
        keynum = window.event.keyCode;
    } else if (event.which) { // Firefox
        keynum = event.which;
    }
    */
    
    if (keycode == UP || keycode == DOWN) {
        spaceship.accelerate(keycode);
        console.log('accel');
    } else if (keycode == LEFT || keycode == RIGHT) {
        spaceship.rotate(keycode);
        console.log('rotate');
    } else if (keycode == SPACE) {
        console.log('shoot');
    }
}

//function check_
window.onload = initialize;
