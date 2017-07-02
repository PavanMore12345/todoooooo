/*todoController is loaded when user successfully login */
app.controller('todoController',function($scope,$window,$location,toastr,$uibModal,$rootScope,todoService,$timeout,logoutService,datainsertion,getcardIn,datadeletion,colorchange,copyContent)
{
var notedata;
$scope.archivenote = true;
$scope.booleanval=false;
 $scope.booleanvalue=true;
 // this is color code when user select color it will set to card.
 $scope.keep="GoogleKeep";
  var colorObj=[
  {
    "color":"fff",
    "path":"image/white.png",
    "tooltip":"White"
  },
  {
    "color":"ff8a80",
    "path":"image/red.png",
    "tooltip":"Red"
  },
  {
    "color":"ffd180",
    "path":"image/orange.png",
    "tooltip":"Orange"
  },
  {
    "color":"ffff8d",
    "path":"image/yellow.png",
    "tooltip":"Yellow"
  },
  {
    "color":"cfd8dc",
    "path":"image/gray.png",
    "tooltip":"Grey"
  },
  {
    "color":"80d8ff",
    "path":"image/blue.png",
    "tooltip":"Blue"
  },
  {
    "color":"a7ffeb",
    "path":"image/teal.png",
    "tooltip":"Teal"
  },
  {
    "color":"ccff90",
    "path":"image/green.png",
    "tooltip":"Green"
  }
]
$scope.color=colorObj;
var $ctrl = this;
//it will share title of the card on facebook
$scope.facebookshare=function(todo){
		console.log("facebook share")
		FB.init({
			appId : '1851117141877304',
			status: true,
			xfbml : true
		});
		 FB.ui({
	           method: 'share_open_graph',
	           action_type: 'og.shares',
	           action_properties: JSON.stringify({
	               object : {
	                  // your url to share
	                  'og:title': todo.title,
	                  'og:description': todo.description,
	                  /*'og:image': 'http://example.com/link/to/your/image.jpg'*/
	               }
	           })
	           },
	           // callback
	           function(response) {
	           if (response && !response.error_message) {
	               // then get post content
	               alert('successfully posted. Status id : '+response.post_id);
	           } else {
	               alert('Something went error.');
	           }
	       });

	};
//it is popup when user click to select image
$scope.open = function ()
{
console.log('opening pop up');
// var $ctrl=this;
var modalInstance = $uibModal.open({
  animation: $ctrl.animationsEnabled,
  templateUrl: 'template/cropPopup.html',
  controller:'cropImage',
  // controllerAs: "$ctrl",
  size: 'lg',
});
}
// this popup will open when user  want to upadte data on card
     $scope.openmodal = function(data) {
         // console.log(data);
         var model = $uibModal.open({
             templateUrl: "template/popupModal.html",
             size: 'md',
             controller: function($uibModalInstance) {
                 this.updatetitle = data.title;
                 this.updatecontent = data.bodyContent;

                 this.date = data.updated_at;
                 this.id = data._id;
                 var color = data.color;
                 //console.log("color",color);
                 this.modalColor = {
                     "background-color":color
                 }
                 //  console.log(this);

                 //update function for model
                 this.update = function() {
                     var $ctrl = this;
                     // console.log("update");
                     console.log(this.updatetitle);
                     var tit = $ctrl.updatetitle;
                     var cont = $ctrl.updatecontent;
                     var cardData = {};
                     cardData["title"] = tit;
                     cardData["bodyContent"] = cont;
                     // console.log(cardData);
                     if (data.title == tit && data.bodyContent == cont) {
                         $uibModalInstance.close();
                         return;
                     }
                     if (tit == "" && cont == "" || tit == undefined && cont == undefined || tit == null && cont == null) {
                         //$scope.del(this.id);
                         $uibModalInstance.close();
                         return;
                     }
                     var log = todoService.app("/updatecard/" + this.id + "", "post", cardData);
                     log.then(function(out) {
                         if (out.data.status == true) {
                             console.log("check");
                             $scope.refresh();
                               //$rootScope.getData11();
                         }
                     }).catch(function(error) {
                         console.log(error);
                     })
                     $uibModalInstance.close();
                 }

                 model.result.catch(function(error) {
                     $uibModalInstance.close();
                 }).then(function(data) {

                 });
             },
             controllerAs: "$ctrl"
         });
     };
//this function will call when user click on listview
$scope.listview = function() {
    localStorage.setItem("view", "list");
    $scope.class="col-lg-12 item";
    $scope.grid = {
        "display": "block"
    }
    $scope.list = {
        "display": "none"
    }
}
//this function will call when user click on gridView
$scope.gridview = function() {
    localStorage.setItem("view", "grid");
    $scope.class="col-lg-4 col-md-6 col-sm-12 item";
    $scope.grid = {
        "display": "none"
    }
    $scope.list = {
        "display": "block"
    }
}
// checking fo;r the view in localStorage in every refresh
if (localStorage.view == "list") {
    $scope.listview();
    $scope.grid = {
        "display": "block"
    }

    $scope.list = {
        "display": "none"
    }
} else {
    $scope.gridview();
    $scope.grid = {
        "display": "none"
    }

    $scope.list = {
        "display": "block"
    }
}
//this function will call when user archive the card
$scope.archive_notes = function(note_id, archiveval)
 {
  //it will send card id and archive value
  //console.log("archieve");
  var url = "/archieve/" + note_id + "";
  var action = "POST";
  var data = {
    value: archiveval
  }
  todoService.app(url, action, data).then(function(data) {
    console.log(data.data.status);
    // toastr.info('Note Archieved Successfully');
      toastr.success("note has archieved");
    $rootScope.getData11();

  }).catch(function(error) {
    console.log(error);
  })
}
//this function will call user click on delete card method
// $scope.delete_note = function(note_id) {
//   //  $rootScope.notedata[0]="pavan you selected Archive ";
//   //console.log("archieve");
//   var url = "/deletecard/" + note_id + "";
//   var action = "POST";
//   // var data = {
//   //   value: deleteval
//   // }
//   console.log(url);
//   //console.log(data);
//   todoService.app(url, action).then(function(data) {
//     console.log(data.data.status);
//     // toastr.info('Note Archieved Successfully');
//       toastr.success("note has deleted");
//     $rootScope.getData11();
//   }).catch(function(error) {
//     console.log(error);
//   })
// }
// $scope.get_notes = function(note_id, archiveval) {
//   //  $rootScope.notedata[0]="pavan you selected Archive ";
//   console.log("archieve");
//   var url = "/activity";
//   var action = "POST";
//
//   var data = {
//     value: archiveval
//   }
//
//   console.log(url);
//   console.log(data);
//   todoService.app(url, action, data).then(function(response) {
//     //console.log(data.data.status);
//     $scope.records=response.data.msg;
//        console.log($scope.records);
//     // toastr.info('Note Archieved Successfully');
//     //$rootScope.getData11();
//   }).catch(function(error) {
//     console.log(error);
//   })
// }
// $scope.copydata = function(data)
// {
//   var title=data.title;
//   var content=data.content;
//   var dataCon = {};
//   dataCon['title'] = title;
//   dataCon['bodyContent'] = content;
//   addCard(dataCon);
// }
//this function will call user want to set reminder
$scope.reminder = function(id, day, time) {
//   $rootScope.notedata[1]="pavan you set reminder";
       var today = new Date();
         var remind = {};
       if (day == "today") {
           // var today = new Date();

           today.setHours(time, 00, 00);
           console.log(today);
           // var remind = {};
           remind["time"] = today;
           reminderCall(remind, id, day);
       } else if (day == "tomorrow") {
 //$rootScope.notedata="pavan you selected tomorrows reminder";
           var tomorrow = new Date(today);
           tomorrow.setDate(tomorrow.getDate() + 1);
           tomorrow.setHours(time, 00, 00);
           console.log(tomorrow);
           // var remind = {};
           remind["time"] = tomorrow;
           reminderCall(remind, id, day);
           // console.log(tomorrow);
       } else if (day == "nextWeek") {
          // $rootScope.notedata[2]="pavan you selected nextWeek reminder";
           var nextWeek = new Date(today);
           nextWeek.setDate(nextWeek.getDate() + 7);
           nextWeek.setHours(time, 00, 00);
           // var remind = {};
           remind["time"] = nextWeek;
           reminderCall(remind, id, day);
           // console.log(nextWeek);
       }
       else{
         console.log("time",time);
           remind["time"] = time;
          // $rootScope.notedata[3]="you selected time is"+time+"";
           reminderCall(remind, id);
       }
   }
   // this function will call when user delete the reminder
   $scope.deleteReminder=function(id){
     var remove=todoService.app("/removeReminder/" + id + "","post");
      //$rootScope.notedata[4]="pavan you  deleted reminder";
     remove.then(function(out){
      // if(out.data.status==true){
         // console.log(data);
         $scope.getData11();
        // toastr.info(' you deleted the reminder');
       //}
     }).catch(function(error){
       console.log(error);
     })
   }
   //call reminders api
   var reminderCall=function(remind, id, day) {
       var callReimnder = todoService.app("/reminders/" + id + "","post",remind);
       callReimnder.then(function(out) {
           // console.log("out",out);
           if (out.data.status == true) {
               console.log(out.data);
               $scope.showreminder = true;
               // console.log(out.data.message.reminder);
               // $scope.day=day;
               // $scope.remind =out.data.message.reminder;
                toastr.success("reminder has been set");
              $scope.getData11();

           }
       }).catch(function(error) {
           console.log(error);
       })
   }
  //when click on refresh button this function will call and page is loaded
$scope.refresh = function()
{
//$rootScope.notedata[5]="pavan you refresh the page";
$window.location.reload();
}
// this function will call when user want to copy the note
$scope.copyData = function(data)
{
  //it will copy  the content from card create new card
  var title=data.title;
     var content=data.bodyContent;
     var color1 = data.color;
    var dataCon = {};
     dataCon['title'] = title;
     dataCon['bodyContent'] = content;
     dataCon['color'] = color1;
  console.log("datacon",dataCon);
  var httpobj1=copyContent.copydata(dataCon);
  httpobj1.then(function(response)
{
  //console.log("res",response);
    toastr.success("note has copied");
    $scope.getData11();
},function(response)
{

});
}   //console.log(todo);
//this function will call when user want to change the color
   $scope.changeColor =function(id,color)
   {
       console.log("color",color);
  //   $rootScope.notedata[7]="pavan you changed the color";
     //console.log(id);
     //console.log("DEL");
     var httpobj123 = colorchange.changeColor(id,color);
     httpobj123.then(function(response)
   {
       toastr.success("note color has been set");
     $scope.getData11();
   },function(response)
   {
   });
   }
  $scope.title11 = function()
  {
    console.log("title");
    $scope.myvalue=true;
  }
  // this function will print all the data.
  $rootScope.getData11 = function()
{
  var httpobj12 = getcardIn.getData11();
  httpobj12.then(function(response)
{
  $scope.records=response.data.msg;
//  console.log($scope.records);
//  console.log(response);
  },function(response)
{

});
}
// $scope.toggle = function() {
//        $scope.custom = $scope.custom === false ? true : false;
//        //checking for screen width
//        if (window.innerWidth > 984) {
//            if (!$scope.custom) {
//                //giving margin in toggle
//                $scope.wrapper = {
//                    'margin-left':'200px'
//                }
//            } else {
//                $scope.wrapper = {
//                    'margin-left': '0px'
//                }
//            }
//        }
//    };
//this function will call when user want to delete card.
$scope.deleteCard =function(id)
{
  var httpobj = datadeletion.delete(id);
  httpobj.then(function(response)
{
    toastr.success("note has been deleted");
  $scope.getData11();
},function(response)
{
});
}
//this function will call when user pinned the data.
$scope.pinned_note = function(pin_id,pinvalue,archiveval)
{
  var url = "/pinnote/" + pin_id + "";
     var action = "POST";
     var data = {
       value: pinvalue,
        removearchive: archiveval
     }
     todoService.app(url, action, data).then(function(data) {
       //console.log(data.data.status);
         toastr.success("note has been pinned");
       $rootScope.getData11();
     }).catch(function(error) {
       console.log(error);
     })
}

// $scope.update = function(id11)
// {
//   //$rootScope.noteData="pavan you updated the note";
//   var title1 = $scope.modelheader;
//   var body = $scope.modelbody;
//   //console.log(id1);
//   var data = {
//     id:id11,
//     title:title1,
//     bodyContent:body
//   }
//   var httpobj = dataupdation.update(data);
//   httpobj.then(function(response)
// {
// //toastr.success("note has updated");
//   $scope.getData11();
// },function(response)
// {
// });
// }
$scope.getData11();
//this function will call when user want to logout
  $scope.logoutPage = function() {
    //console.log("SDfssds");

      var httpobj = logoutService.logoutPage();
      httpobj.then(function(response)
        {
          if(response.data.status==false)
          {
          //$state.go("home");
        //  alert("logout success");
          toastr.success("successfully logout");
          $location.path("/login");
        }
      }, function(response) {
          // this function handles error
      });
  }
//this function will call when user want to add new card
  $scope.done = function()
  {
  //  $rootScope.activity[10]="pavan you added new note";
  $scope.myvalue=false;
  // it will read data from user
  var body=$scope.body11;
  var tit=$scope.title;
  if ((tit == undefined && body == undefined) || (tit == null && body == null) || (tit == "" && body == "")) {
         return;
       }
   else
   {
    var todo=
    {
  bodyContent:body,
  title:tit
};
  }
  // console.log($scope.body11);

    var httpobj=datainsertion.done(todo);
    httpobj.then(function(response)
  {
    console.log(response);
    $scope.title="";
      $scope.body11="";
        toastr.success("note has been added");
      $scope.getData11();
  },function(response)
  {

  });    //console.log(todo);
  }

});
//logout api is called
app.service("logoutService",function($http) {
    this.logoutPage = function() {
        return $http({
            url: "/logout",
            method: "post"
        });
    }
});
//addcard api is called
app.service("datainsertion",function($http)
{
  this.done=function(todo)
  {
    console.log(todo);
    return $http({
    url:"/addcard",
    method:"post",
    data:todo
      })
  }
});
//addcard api is called for copy the card.
app.service("copyContent",function($http)
{
  this.copydata=function(todo)
  {
    console.log(todo);
    return $http({
    url:"/addcard",
    method:"post",
    data:todo
      })
  }
});
//deletecard api is called
app.service("datadeletion",function($http)
{
this.delete = function(id)
{
  return $http({
    url: "/deletecard/" + id + "",
    method:"delete"
  })
}
});
//getData api is called;
app.service("getcardIn",function($http)
{
this.getData11=function()
{
return $http({
url:"/getData",
method:"post"
  })
}
});
//setcolor api is called
app.service("colorchange",function($http)
{
this.changeColor=function(id,color)
{
  var colorObj = {
    "color":"#"+color
  };
  //console.log(udata);
return $http({
url: "/setcolor/" + id + "",
method:"post",
data:colorObj
  })
}
});
