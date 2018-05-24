/*global  $,"for":true,*/

/*
 *
Name: Melvin Viana 
Project: Pagination Filter 
Start Date: May 21,2018
Last Update: May 23, 2018
 */
$(document).ready(function () {
    "use strict";
//When the page loads, the links should be added dynamically.
    var numberOfStudents = $('ul li').length;
    var pages = Math.ceil(numberOfStudents/10);
    var arrIndexOfStudents =[];
    var isSearchFunction = false;
    //Contains student name; used for search Query.
    var arrStudentName =[];
    var arrStudentEmail =[];
    //Loop through all students and add their names
    for(var i=0; i< numberOfStudents; i++){
        arrStudentName.push($('ul li h3').eq(i).html());
        arrStudentEmail.push($('ul li span.email').eq(i).html());
    }

     //This function finds how many pages should be needed.
    function appendPageLinks(pages) {
        var i = 0;
        $('.pagination ul').html('')
        var html =""
            for (var i=0; i < pages;i++){
                html+=  `<li><a href="#" class="pageLinks">${i+1}</a></li>`;
            }
            //Place the html within the pagination.
            $('.pagination ul').html(html);
}

    function showPage(currentPage,pages,numStudents,isSearchFunction){
        //Hide all students
        $('.student-item').hide();
        var pageIndex = currentPage -1;
        var lastPageStudents = numStudents % 10;
        //Display current page of students.
        
        //Display all the students if it is not a search query.
        if (!isSearchFunction){
         //Display 10 items of current page.
        if(currentPage!==pages){for(var i=0; i<10;i++){
            $('.student-item').eq((pageIndex*10)+i).show();
        }
        }
        //If it's the last page display the last student items
        else{
            for(var i =0; i<lastPageStudents; i++){
            $('.student-item').eq((pageIndex*10)+i).show();
        }

            }
    }
    //--------------------------------------------------------------------------
        //If the user pressed search button look for the array with the indexes
        else if(isSearchFunction){
            $('.student-item').hide();
            
            //Check if the first page is the last page.
            if(pages===currentPage){
                
                //10 students exactly
                if(lastPageStudents===0){
                    for(var i=0; i<10; i++){
                        $('.student-item').eq(arrIndexOfStudents[pageIndex*10]+i).show();   
                       }
                }
                
                //Less than 10 students
                else{
                for(var i=0; i<lastPageStudents; i++){
                    $('.student-item').eq(arrIndexOfStudents[pageIndex*10]+i).show();   
                   }
                }
            }
                
            //All pages that isn't the last page.
            else{
                for(var i=0; i<10;i++){
                    $('.student-item').eq(arrIndexOfStudents[(pageIndex*10)+i]).show();

                }
            }
        }//End if; isSearchFunction === true
   
    } //End function showPage()    
    
    //Append Searchbox Dynamically
    function appendSearch(){
        $('.page-header').append(`<div class="student-search">
        <input placeholder="Search for students...">
        <button>Search</button>
      </div>`);
    }

    //Run when search button is pressed; Inputs index locations of student-items that match
    // the user search query.
    function searchFunction(){
        //Loop through all the student divs to find where similar students are within the input.
        arrIndexOfStudents=[];

        var strInputValue = ($('input').val());
        for(var i=0; i<numberOfStudents;i++){
            if(arrStudentName[i].indexOf(strInputValue) !== -1  || arrStudentEmail[i].indexOf(strInputValue) !==-1)
            {
                arrIndexOfStudents.push(i);
            }
        }
      
        //Holds number of pages after searching through entire collection of students.
        pages = Math.ceil(arrIndexOfStudents.length/10);
        //Display the first page after the button is pressed.
        showPage(1,pages,arrIndexOfStudents.length,isSearchFunction);
    }
    //Dynamically add the page numbers according to how many students are in the list.
    appendPageLinks(pages);
    //Add search.
    appendSearch();
    //This dynamically makes page 1 as the active link.
    $('.pagination ul li:first-child a').addClass('active');

    //Show first page when index.html loads on a browser with JavaScript enabled.
    showPage(1,pages, numberOfStudents);

    //Search button event
    $('button').on('click',function(){
        isSearchFunction=true;
        searchFunction();
        //Append page Links 
        appendPageLinks(Math.ceil(arrIndexOfStudents.length/10));
        
        //If links are empty hide the .noResults div
        if (arrIndexOfStudents.length == 0){
            $('.student-list').append(`<div class="noResults">No results shown</div>`);}
            else{
                $('.student-list .noResults').html('');
            }
            
    });

    //Event handler for when user clicks one of the links
    $('.pagination ul').on('click','.pageLinks',function(e){
    e.preventDefault();
     //Holds the pageNumber that was clicked.
     var pageNum=parseInt($(this).text());
     //Remove active class off of the previous page.
      $('a.active').removeClass('active');
      //Change active link.
      $(this).addClass('active');
      //Display the proper page
      if(isSearchFunction=== true){
          numberOfStudents = arrIndexOfStudents.length;
      }
      showPage(pageNum,pages,numberOfStudents,isSearchFunction);
      
    });
});
