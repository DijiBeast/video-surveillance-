video = "";
status1 = "";
objects = "";
function preload()
{
video = createVideo("video.mp4");
video.hide();
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 500, 500);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResults());
        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected!";
            document.getElementById("number").innerHTML = "Number of objects : " + objects.length;
            fill("#14e0a7");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#303028");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("cocossd Model Loaded!");
    status1 = true;
    video.speed(1);
    video.loop();
    video.volume(0);
}

function gotResults(results)
{
    console.log(results);
    objects = results;
}