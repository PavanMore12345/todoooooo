app.controller('todoController',function($scope,$location,$uibModal,$rootScope,todoService,$timeout,logoutService,datainsertion,getcardData,datadeletion,dataupdation,colorchange,copyContent)
{
  //$scope.class="col-sm-6 col-lg-4 col-lg-12 item"
  //console.log($scope.open);
//  $scope.open = false;
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
$scope.hoverIn = function(){
    this.open = true;
};

$scope.hoverOut = function(){
    this.open = false;
};
$scope.color=colorObj;
var $ctrl = this;
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
$scope.listview = function() {
    localStorage.setItem("view", "list");
    // $scope.showgrid = false;
    // $scope.showlist = true;
  //  $scope.divchange="addCardList";
    $scope.class="col-lg-12 item";
    $scope.grid = {
        "display": "block"
    }
    $scope.list = {
        "display": "none"
    }
}

$scope.gridview = function() {
    localStorage.setItem("view", "grid");
    // $scope.showgrid = true;
    // $scope.showlist = false;
    //$scope.divchange="addCard";
    $scope.class=" col-md-4 item";
    $scope.grid = {
        "display": "none"
    }
    $scope.list = {
        "display": "block"
    }
}
// checking fo;r the view in localStorage in every refresh
if (localStorage.view == "list") {
    // $scope.showlist = true;
    // $scope.showSomething="col-xl-12 col-md-12 col-lg-12 col-sm-12 col-xs-12 card1"
    $scope.listview();
    $scope.grid = {
        "display": "block"
    }

    $scope.list = {
        "display": "none"
    }
} else {
    // $scope.showgrid = true;
    // $scope.showSomething="col-xl-3 col-lg-4 col-sm-4 col-xs-12 card"
    $scope.gridview();
    $scope.grid = {
        "display": "none"
    }

    $scope.list = {
        "display": "block"
    }
}
// $scope.copydata = function(data)
// {
//   var title=data.title;
//   var content=data.content;
//   var dataCon = {};
//   dataCon['title'] = title;
//   dataCon['bodyContent'] = content;
//   addCard(dataCon);
// }
$scope.reminder = function(id, day, time) {
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

           var tomorrow = new Date(today);
           tomorrow.setDate(tomorrow.getDate() + 1);
           tomorrow.setHours(time, 00, 00);
           console.log(tomorrow);
           // var remind = {};
           remind["time"] = tomorrow;
           reminderCall(remind, id, day);
           // console.log(tomorrow);
       } else if (day == "nextWeek") {

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
           reminderCall(remind, id);
       }
   }
   $scope.deleteReminder=function(id){
     var remove=todoService.app("/reminders/" + id + "","post");
     remove.then(function(out){
       if(out.data.status==true){
         // console.log(data);
         $scope.refresh();
       }
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
               $scope.refresh();
           }
       }).catch(function(error) {
           console.log(error);
       })
   }
$scope.refresh = function()
{
//  console.log("DSF");
  $scope.getData11();
}
$scope.copyData = function(data)
{

  //console.log("datacon",dataCon);
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
  console.log("res",response);
    $scope.getData11();
},function(response)
{

});
}   //console.log(todo);

   $scope.changeColor =function(id,color)
   {
     console.log(id);
     console.log("DEL");
     var httpobj123 = colorchange.changeColor(id,color);
     httpobj123.then(function(response)
   {
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
  $rootScope.getData11 = function()
{
  var httpobj12 = getcardData.getData11();
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
$scope.delete =function(id)
{
  console.log(id);
  console.log("DEL");
  var httpobj123 = datadeletion.delete(id);
  httpobj123.then(function(response)
{
  $scope.getData11();
},function(response)
{
});
}
$scope.pinned_note = function(pin_id,pinvalue)
{
  var url = "/pinnote/" + pin_id + "";
     var action = "POST";
     var data = {
       value: pinvalue
     }
     todoService.app(url, action, data).then(function(data) {
       console.log(data.data.status);
       $rootScope.getData11();
     }).catch(function(error) {
       console.log(error);
     })
}

$scope.update = function(id11)
{
  var title1 = $scope.modelheader;
  var body = $scope.modelbody;
  //console.log(id1);
  var data = {
    id:id11,
    title:title1,
    bodyContent:body
  }
  var httpobj = dataupdation.update(data);
  httpobj.then(function(response)
{
  $scope.getData11();
},function(response)
{
});
}
$scope.updateData =function(id11,title,body)
{
  console.log("update");
  $scope.myval = true;
  $scope.modelheader = title;
  $scope.modelbody = body;
$scope.update(id11);
}
$scope.getData11();
  $scope.logoutPage = function() {
    console.log("SDfssds");

      var httpobj = logoutService.logoutPage();
      httpobj.then(function(response)
        {
          if(response.data.status==false)
          {
          //$state.go("home");
          alert("logout success");
          $location.path("/login");
        }
      //   else {
      //     // console.log("fgfgfd");
      //     // $location.path("/signup");
      //   }
          // $scope.user="";

        console.log(response);
      }, function(response) {
          // this function handles error
      });
  }

  $scope.done = function()
  {
  $scope.myvalue=false;
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

    var httpobj1=datainsertion.done(todo);
    httpobj1.then(function(response)
  {
    console.log(response);
    $scope.title="";
      $scope.body11="";
      $scope.getData11();
  },function(response)
  {

  });    //console.log(todo);
  }

});
app.service("logoutService",function($http) {
    this.logoutPage = function() {
        return $http({
            url: "/logout",
            method: "post"
        });
    }
});
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
app.service("getcardData",function($http)
{
this.getData11=function()
{
return $http({
url:"/getData",
method:"post"
  })
}
});
app.service("dataupdation",function($http)
{
this.update=function(udata)
{
  console.log(udata);
return $http({
url:"/updatecard",
method:"post",
data:udata
  })
}
});
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
