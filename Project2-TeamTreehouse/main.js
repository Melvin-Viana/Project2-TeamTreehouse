/*global  $*/
$(document).ready(function () {
    "use strict";
//When the page loads, the links should be added dynamically.
    var numberOfStudents = $('ul li').length;
    var pages = Math.floor(numberOfStudents/10);
//This function finds how many pages should be needed.
    function appendPageLinks(pages) {
        var i = 0;
        for (var i=0; i < pages;i++){
            $('.pagination ul').append(`<li><a href="#" class="pageLinks">${i+1}</a></li>`);
        }
}

    function showPage(pageNumber,pages){
        //Hide all students
        $('.student-item').hide();
        //Display current page of students.
        if(pageNumber!=pages){
            $('.student-item').slice((pageNumber-1)*10,pageNumber*10).show();
        }
        else{
            $('.student-item').slice(pages*10).show();
        }
    }
    //Dynamically add the page numbers according to how many students are in the list.
    appendPageLinks(pages);
    //This dynamically makes page 1 as the active link.
    $('.pagination ul li:first-child a').addClass('active');
    //Show first page when index.html loads on a browser with JavaScript enabled.
    showPage(1,pages);

    //Click one of the links.
     $('.pageLinks').on("click",function(){
        //Holds the pageNumber that was clicked.
        var pageNum=parseInt($(this).text());
       //Remove active class off of the previous page.
        $('a.active').removeClass('active');
        //Change active link.
        $(this).addClass('active');
        //Display the proper page
        showPage(pageNum,pages);
    }
);
});