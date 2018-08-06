$(document).ready(function(){
    $(".skill-tabs h2").on("click", function() {
        $(".skill-tabs h2").removeClass("active-tab");
        $(this).addClass("active-tab");
    })

    var topPrevent = true;
    var additionalPrevent = true;
    $(".top-skills-tab").on("click", function() {
        if (topPrevent) {
            $(".skills").slideUp();
            $(".top-skills").slideDown();
            topPrevent = false;
            additionalPrevent = true;
        }
    })

    $(".additional-skills-tab").on("click", function() {
        if (additionalPrevent) {
            $(".skills").slideUp();
            $(".additional-skills").slideDown();
            additionalPrevent = false;
            topPrevent = true;
        }
    })

    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $(".logo img").addClass("scroll-img");
            $(".main-nav a").addClass("nav-scroll");
            $(".go-topSection").show();
        }
        else {
            $(".logo img").removeClass("scroll-img");
            $(".main-nav a").removeClass("nav-scroll");
            $(".go-topSection").hide();
        }
    });

    setBindings();

    function loadPhotos() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/images.json', true);
        xhr.onload = function() {
            if (this.status == 200) {
                var allPhotos = JSON.parse(this.responseText);
                var showProject = allPhotos;
                var showProjects = "";
                var movedPhoto;

                function setPhotos() {
                    if($(window).width() > 768) {
                        showProjects = "";
                        for (var i = 0; i < 2; i++) {
                            // ES5
                            // showProjects += "<div class='project-img'>" +
                            //                     "<img src='" + showProject[i].path + "'>" +
                            //                     "<div class='box-hover'>" +
                            //                         "<img src='img/eye-white.png'" + "alt='eye'>" +
                            //                         "<span>Go to site</span>" +
                            //                     "</div>" +
                            //                 "</div>";
                            // ES6
                            showProjects += `<div class="project-img">
                                                <img src="${showProject[i].path}">
                                                <a href="${showProject[i].url}" target="_blank">
                                                    <div class="box-hover">
                                                        <img src="img/eye-white.png" alt="eye">
                                                        <span>Go to site</span>
                                                    </div>
                                                </a>
                                            </div>`;
                        }
                        $(".ajax-projects").html(showProjects);
                    } else {
                        showProjects = "";
                        showProjects += `<div class="project-img">
                                            <img src="${showProject[0].path}">
                                            <a href="${showProject[0].url}" target="_blank">
                                                <div class="box-hover">
                                                    <img src="img/eye-white.png" alt="eye">
                                                    <span>Go to site</span>
                                                </div>
                                            </a>
                                        </div>`;
                        $(".ajax-projects").html(showProjects);
                    }
                }

                setPhotos();

                $(".next-img").on("click", function(){
                    movedPhoto = showProject[0];
                    showProject.shift();
                    showProject.push(movedPhoto);
                    showProjects = "";
                    setPhotos();
                })
                $(".prev-img").on("click", function(){
                    movedPhoto = showProject[showProject.length - 1];
                    showProject.pop();
                    showProject.unshift(movedPhoto);
                    showProjects = "";
                    setPhotos();
                })
            }
        }
        xhr.send();
    }

    loadPhotos();

    $(window).resize(function() {
        loadPhotos();
    });

});

function setBindings() {
    $(".main-nav a").on("click", function(e) {
        e.preventDefault();
        var sectionId = e.currentTarget.id + "Section";
        $("html, body").animate({
            scrollTop: $("#" + sectionId).offset().top - 40
        }, 1000);
    });

    $("#go-top").on("click", function() {
        $("html, body").animate({
            scrollTop: $("#go-topSection").offset().top
        }, 1000);
    });
}

