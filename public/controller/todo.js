$(document).ready(function()
{
var view;
if(localStorage.getItem("view")=="gridview")
{
  console.log("gridView");
  gridView();
}
else {
  console.log("listView");
listView();
}
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    // $("#body").hide();
    // $("#title").click(function(e) {
    //     $("#body").show();
    // });
    // $("#done").click(function(e) {
    //     $("#body").hide();
    //     var title = $("#title").html();
    //     var bodydata = $("#body11").html();
    //     var data = {};
    //     data["title"] = title;
    //     data["bodyContent"] = bodydata;
    //     if (title == "" && bodydata == "") {
    //         return;
    //     }
    //     addCard(data);
    //     $('#title').html("");
    //     $("#body11").html("");
    // });

    // function addCard(data1) {
    //     $.ajax({
    //         type: "POST",
    //         data: data1,
    //         dataType: "json",
    //         url: "/addcard",
    //         success: function(response) {
    //             console.log('page was not loaded', response);
    //             if(localStorage.getItem("view")=="gridview")
    //             {
    //             localStorage.setItem("view","gridview");
    //             $("#container").html("");
    //             gridView();
    //           }else {
    //             localStorage.setItem("view","listView");
    //             $("#container").html("");
    //             listView();
    //           }
    //         },
    //         error: function(error) {
    //             console.log('page was not loaded', error);
    //         },
    //         complete: function(xhr, status) {
    //             console.log('request is completed');
    //         }
    //     });
    // }
    $("#title").keypress(function(e) {
        if (e.which == 13) {
            $("#body11").focus();
        }
    });
    $("#btn1").click(function(e) {
        var title = $("#modeltitle").val();
        var modelbody = $("#modelbody").html();
        console.log(title);
        console.log(modelboy);
    });
    $("#list").click(function(e)
    {
      if(localStorage.getItem("view")=="gridview")
      {
      localStorage.setItem("view","listView");
      $("#container").html("");
      listView();
    }else {
      localStorage.setItem("view","gridview");
      $("#container").html("");
      gridView();
    }
    });
    $("#refresh").click(function(e) {
        location.reload();
    });

    $("#card").mouseover(function() {
        $("#trash").show();
    });
});

function getData(view) {
    $.ajax({
        url: "/getData",
        type: "POST",
        dataType: 'JSON',
        success: function(response) {
            for (var i = 0; i < response.msg.length; i++) {
                var id11 = response.msg[i]._id;

// if(response.msg[i].bodyContent.length<10)
// {
//   console.log(response.msg[i].bodyContent.length);
//   $(".cardbody").css("font-size","30px");
// }
// else
// {
//   $(".cardbody").css("font-size","15px");
// }
  var MyDom = $("<div>").addClass(view).attr('id', view).append('<div class="w3-panel w3-card" id="card"><br><div id="title"><b>&nbsp&nbsp&nbsp&nbsp' + response.msg[i].title + '</b></div><div class = "cardbody"><br>&nbsp&nbsp&nbsp&nbsp' + response.msg[i].bodyContent + '</div></div>').data(response.msg[i]).unbind("click").dblclick(function() {
                  var todoData = $(this).data();
                  $('#myModal').modal();
                  console.log($("#modelbody"));
                  $("#modelbody").html(todoData.bodyContent);
                  $("#modelheader").html(todoData.title);
                  $("#editdone").click(function(e) {
                      $("#editdone").attr("disabled", true);
                      var title = $("#modelheader").html();
                      var bodydata = $("#modelbody").html();
                      var data = {};
                      data.title = title;
                      data.bodyContent = bodydata;
                      data.id = todoData._id;
                      $.ajax({
                          type: "POST",
                          data: data,
                          dataType: "json",
                          url: "/updatecard",
                          success: function(response) {
                              $("#editdone").attr("disabled", false);
                          },
                          error: function(error) {
                              console.log('page was not loaded', error);
                          },
                          complete: function(xhr, status) {
                              $("#editdone").attr("disabled", false);
                              $("#modelbody").html("");
                              $("#modelheader").html("");
                               $('#myModal').modal('hide');
                               if(localStorage.getItem("view")=="gridview")
                               {
                               localStorage.setItem("view","gridview");
                               $("#container").html("");
                               gridView();
                             }else {
                               localStorage.setItem("view","listView");
                               $("#container").html("");
                               listView();
                             }
                              console.log('request is completed');

                          }
                      });
                  });

                });

                $("#container").prepend(MyDom);
                $("#card").append("<span class='glyphicon glyphicon-trash' aria-hidden='true' id='trash' ontouchstart=deleteCard('" + id11 + "') onclick = deleteCard('" + id11 + "')></span>");
                var elem = document.querySelector('#container');
                var pckry = new Packery(elem, {
                    // options
                    itemSelector: "#"+view,
                    gutter: 20
                });
                pckry.getItemElements().forEach(function(itemElem) {
                    var draggie = new Draggabilly(itemElem);
                    pckry.bindDraggabillyEvents(draggie);
                });

            }
        },
        error: function(error) {
            console.log("some error occured");
        },
        complete: function(xhr, status) {
            console.log("request is completed");
        }
    });
}

function deleteCard(id) {
    console.log(id);
    $.ajax({
        type: "DELETE",
        url: "/deletecard/" + id + "",
        success: function(response) {
          if(localStorage.getItem("view")=="gridview")
          {
          localStorage.setItem("view","gridview");
          $("#container").html("");
          gridView();
        }else {
          localStorage.setItem("view","listView");
          $("#container").html("");
          listView();
        }
            console.log('page was not loaded', response);
        },
        error: function(error) {
            console.log('page was not loaded', error);
        },
        complete: function(xhr, status) {
            console.log('request is completed');
        }
    });
}
function gridView()
{
  $("#list").removeClass("glyphicon glyphicon-th-list").addClass("glyphicon glyphicon-th");
 view="grid";
  getData(view);
}
function listView()
{
$("#list").removeClass("glyphicon glyphicon-th").addClass("glyphicon glyphicon-th-list");
view="list";
getData(view);
  }
