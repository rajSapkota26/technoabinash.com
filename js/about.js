// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
        scrollBtn.style.display = "block";
    } else {
        nav.classList.remove("sticky");
        scrollBtn.style.display = "none";
    }
}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
    navBar.classList.add("active");
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    body.style.overflow = "hidden";
    scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflow = "auto";
    scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        navBar.classList.remove("active");
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
    });
}

// canves slider 
$(window).load(function () {

    //  listening to the window.load event, so we can be sure that the images in the slideshow are loaded properly.


    // Testing wether the current browser supports the canvas element:
    var supportCanvas = 'getContext' in document.createElement('canvas');

    // The canvas manipulations of the images are CPU intensive, this is why we are using setTimeout to make them asynchronous
    // and improve the responsiveness of the page.

    var slides = $('#slideshow li'),
        current = 0,
        slideshow = { width: 0, height: 0 };

    setTimeout(function () {

        window.console && window.console.time && console.time('Generated In');

        if (supportCanvas) {
            $('#slideshow img').each(function () {

                if (!slideshow.width) {
                    // Taking the dimensions of the first image:
                    slideshow.width = this.width;
                    slideshow.height = this.height;
                }

                // Rendering the modified versions of the images:
                createCanvasOverlay(this);
            });
        }

        window.console && window.console.timeEnd && console.timeEnd('Generated In');

        $('#slideshow .arrow').click(function () {
            var li = slides.eq(current),
                canvas = li.find('canvas'),
                nextIndex = 0;

            // Depending on whether this is the next or previous
            // arrow, calculate the index of the next slide accordingly.

            if ($(this).hasClass('next')) {
                nextIndex = current >= slides.length - 1 ? 0 : current + 1;
            }
            else {
                nextIndex = current <= 0 ? slides.length - 1 : current - 1;
            }

            var next = slides.eq(nextIndex);

            if (supportCanvas) {

                // This browser supports canvas, fade it into view:

                canvas.fadeIn(function () {

                    // Show the next slide below the current one:
                    next.show();
                    current = nextIndex;

                    // Fade the current slide out of view:
                    li.fadeOut(function () {
                        li.removeClass('slideActive');
                        canvas.hide();
                        next.addClass('slideActive');
                    });
                });
            }
            else {

                // This browser does not support canvas.
                // Use the plain version of the slideshow.

                current = nextIndex;
                next.addClass('slideActive').show();
                li.removeClass('slideActive').hide();
            }
        });

    }, 100);

    // This function takes an image and renders
    // a version of it similar to the Overlay blending
    // mode in Photoshop.

    function createCanvasOverlay(image) {

        var canvas = document.createElement('canvas'),
            canvasContext = canvas.getContext("2d");

        // Make it the same size as the image
        canvas.width = slideshow.width;
        canvas.height = slideshow.height;

        // Drawing the default version of the image on the canvas:
        canvasContext.drawImage(image, 0, 0);


        // Taking the image data and storing it in the imageData array:
        var imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height),
            data = imageData.data;

        // Loop through all the pixels in the imageData array, and modify
        // the red, green, and blue color values.

        for (var i = 0, z = data.length; i < z; i++) {

            // The values for red, green and blue are consecutive elements
            // in the imageData array. We modify the three of them at once:

            data[i] = ((data[i] < 128) ? (2 * data[i] * data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
            data[++i] = ((data[i] < 128) ? (2 * data[i] * data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
            data[++i] = ((data[i] < 128) ? (2 * data[i] * data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));

            // After the RGB elements is the alpha value, but we leave it the same.
            ++i;
        }

        // Putting the modified imageData back to the canvas.
        canvasContext.putImageData(imageData, 0, 0);

        // Inserting the canvas in the DOM, before the image:
        image.parentNode.insertBefore(canvas, image);
    }

});

//local storage
const add_todo = () => {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let email = document.getElementById("email").value;
    let subFeed = document.getElementById("subject").value;

    let todos = [];

    //string
    let localTodos = localStorage.getItem("todos");

    if (localTodos != null) {
        todos = JSON.parse(localTodos);
    }

    let todoObject = {
        email: email,
        title: title,
        desc: desc,
        subject: subFeed,
        id: Math.trunc(Math.random() * 1000),
    };

    todos.push(todoObject);

    localStorage.setItem("todos", JSON.stringify(todos));


};

//show the data

const show_todo = () => {
    let todoString = localStorage.getItem("todos");

    let content = "";

    if (todoString == null) {
        //no todo
        content += "<h3 class='text-white'>NO TODO TO SHOW</h3>";
    } else {
        let todos = JSON.parse(todoString);
        for (let todo of todos.reverse()) {
            content += ` <div class="box">
                         <div class="icon">
                            <i class="fas fa-desktop"></i>
                          </div>
                            <div class="topic">${todo.title}</div>
                            <p>${todo.email}</p>
                            <p>${todo.subject}</p>
                            <p>${todo.desc}</p>
                        </div>
                    `;
        }
    }

    document.getElementById("boxes").innerHTML = content;
};
function hide_todo() {
    document.getElementById("boxes").innerHTML = null;
}