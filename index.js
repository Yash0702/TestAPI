var preloader = document.getElementById('loading');
function loading(){
    preloader.style.display = 'none';
}

$(document).ready(function () {
    var item, title, author, publisher, bookLink, bookImg
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    var placeHldr = '<img src="https://via.placeholder.com/150">'
    var searchData;

    //Listener for search button
    var input = document.getElementById("search-box");
        input.addEventListener("keyup", function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Cancel the default action, if needed
              event.preventDefault();
              // Trigger the button element with a click
              document.getElementById("search").click();
            }
          });
    $("#search").click(function () {
        outputList.innerHTML = ""; //empty html output
        document.body.style.backgroundImage = "url('240617.jpg')";
        searchData = $("#search-box").val();
        //Handling empty search input field
        if (searchData === "" || searchData === null) {
            displayError();
        }
        else {
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    if (response.totalItems === 0) {
                        alert("No results!... try again")
                    }
                    else {
                        $("#title").animate({ 'margin-top': '5px' }, 1000);
                        $(".book-list").css("visibility", "visible");
                        displayResults(response);
                    }
                },
                error: function () {
                    alert("Something went wrong...<br>" + "Try again!")
                }
            });
        }
        $("#search-box").val(""); //clear search box
    });
    /* functions to display results in index.html @param res */
    function displayResults(response) {
        for (var i = 0; i < response.items.length; i += 2) {
            item = response.items[i];
            title1 = item.volumeInfo.title;
            author1 = item.volumeInfo.authors[0];
            publisher1 = item.volumeInfo.publisher;
            bookLink1 = item.volumeInfo.previewLink;
            bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
            bookOclc = item.volumeInfo.industryIdentifiers[1].identifier
            bookLccn = item.volumeInfo.industryIdentifiers[1].identifier
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            item2 = response.items[i + 1];
            title2 = item2.volumeInfo.title;
            author2 = item2.volumeInfo.author;
            publisher2 = item2.volumeInfo.publisher;
            bookLink2 = item2.volumeInfo.previewLink;
            bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
            bookOclc2 = item2.volumeInfo.industryIdentifiers[1].identifier
            bookLccn2 = item2.volumeInfo.industryIdentifiers[1].identifier
            bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

            //output to output list
            outputList.innerHTML += '<div class="col-lg-5">' +
                formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn, bookOclc, bookLccn)
            formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2, bookOclc2, bookLccn2)
            '</div>';
            console.log(outputList);
        }
    }
    /* Template for bootstrap Cards*/
    function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
        var viewUrl = 'book.html?isbn=' + bookIsbn;
        var viewUrl = 'book.html?oclc=' + bookOclc; 
        var viewUrl = 'book.html?lccn=' + bookLccn;
        var htmlCard = `
                        <div class="card" style="background-color: rgb(103, 250, 255); margin-left: 9rem; margin-bottom: 3rem">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${bookImg}" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">Author: ${author}</p>
                                <p class="card-text">Publisher: ${publisher}</p>
                                <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read More</a>
                              </div>
                            </div>
                        </div>
                        </div>`
        return htmlCard;
    }
    //handling error displaying empty search box
    function displayError() {
        alert("Search term cannot be empty");
    }
});

