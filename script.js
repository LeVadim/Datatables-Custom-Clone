/**
 * Created by levadim on 3/31/16.
 */


$.fn.vadim = function(){
  this.css('color','red');
  this.css('font-size','30px');
    console.log(this);
  return this;
};

$.fn.menu = function( options ){
    var settings = $.extend({
        // These are the defaults.
        color: "red",
        backgroundColor: "white",
        fontSize: "29px"
    }, options );
    console.log(this);
    row = ' <li><a href="#">Link</a></li>';
    row += ' <li><a href="#">Link</a></li>';
     this.append(row);
     this.children().find('a').css({
         'color': settings.color,
         'font-size': settings.fontSize
     });
    return this;
};

$.fn.vadimTable = function(options){
    thisTable = this;
    thisTable.settings = {
        'paginateFor': 5,
        'currentPage': 1
    };


    this.find('tr').first().before('<tr><td><input style="align:right;" class="searchBar form-control" type="search" placeholder="search"></td></tr>');
    $('.searchBar').keyup(function(){
        thisTable.filterSearch();
    });

    this.paginate = function(find){
        thisTable.append('<ul id="pagination" class="pagination"></ul>');
            var count = 0;
            var pages = 0;
            var pagination = [];
            var paginateFor = thisTable.settings.paginateFor;
            var row;
            thisTable.find(find).each(function(nothing,element) {
                        count = count + 1;
                        if(count == paginateFor){
                            paginateFor = paginateFor + thisTable.settings.paginateFor;
                            pages = pages + 1;
                            if(thisTable.settings.currentPage == pages){
                                row = '<li class="active"><a class="paginationNumber" data-page="' + pages + '" href="#">'+pages+'</a></li>';
                            }else{
                                row = '<li><a class="paginationNumber" data-page="' + pages + '" href="#">'+pages+'</a></li>';
                            }
                            pagination.push(row);
                        }
            });
        $('#pagination').html(pagination);
        $('.paginationNumber').click(function(){
            var page  = $(this).data('page');
            thisTable.settings.currentPage = page;
            return thisTable.renderMethod();
        })
    };

    this.renderMethod = function(){
            thisTable.loadData();
    }



    this.loadData = function(){
        var searchValue, searched;
        var paginateFor = thisTable.settings.paginateFor;
        count = 0;
        pages = 0;
        thisTable.find('tbody').each(function(nothing,element){
            $(element).find('tr').each(function(nothing,elementPAG){
                $(elementPAG).removeClass('hide');
                $(elementPAG).addClass('hide');
                count = count + 1;
                if(count == paginateFor) {
                    pages = pages + 1;
                    paginateFor = paginateFor + thisTable.settings.paginateFor;
                }
                if(pages == thisTable.settings.currentPage){
                    $(elementPAG).removeClass('hide');
                }
            });
        });
        this.paginate('tbody tr');
    };


    this.filterSearch = function(){
        /******
         * INIT
         */
        var searchValue, searched;
        var paginateFor = thisTable.settings.paginateFor;
        count = 0;
        pages = 0;
        searchValue = $('.searchBar').val();


        /**************
         * SEARCH
         */
        thisTable.find('tbody').each(function(nothing,element){
            $(element).find('tr').removeClass('hide');
            $(element).find('tr:not(:contains('+searchValue+'))').each(function(nothing,elementPAG){
                $(elementPAG).addClass('hide');
                        count = count + 1;
                        if(count == paginateFor) {
                            pages = pages + 1;
                            paginateFor = paginateFor + thisTable.settings.paginateFor;
                        }
                if(pages == thisTable.settings.currentPage){
                    $(elementPAG).removeClass('hide');
                    $(elementPAG).find(':not(:contains('+searchValue+'))').addClass('hide');
                }
            });
            this.paginate('tr:not(:contains('+searchValue+'))');
        });

        /*********
         * DO
         */
        //thisTable.find('tbody').append(searched);
    };

    return this.renderMethod();
};

$(function(){

    $('.panel-heading').vadim();
    $('#myMenu').menu({
        'color': 'orange',
        'fontSize': '18px'
    });
    $('#table').vadimTable();
});

