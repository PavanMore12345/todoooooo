/*when user select the image this controller is called*/
app.controller('cropImage', function($scope, $rootScope, todoService,$uibModalInstance,getuuData) {
    $scope.myImage = $rootScope.changeProfilepic;
    $scope.myCroppedImage = '';
    $scope.prof=function()
    {
      angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
    }

    var handleFileSelect = function(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();

        console.log("file", evt.currentTarget.files);
        reader.onload = function(evt) {
            $scope.$apply(function($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
        //  console.log($scope.myCroppedImage);
        console.log(file);

    };


   //it will set the image when image is selected.
    $scope.setImage = function() {
        // console.log("image path",$('#fileInput').val());
        var original = $scope.myImage;
        var croped = $scope.myCroppedImage;
        var name=$rootScope.userName;
       console.log("name",name);
        var image = {
            "originalImage": original,
            "cropedImage": croped,
            "name":name
        }
        // console.log("image",file);
        //imageload api is called.
        var upload = todoService.app("/imageload/" + $rootScope.user_id + "", "post", image);
        // console.log("asd");

        upload.then(function(out) {
          console.log(out);
            if (out.data.status == true) {
                // console.log(data);
                // $scope.refresh();
                console.log("check");
                console.log(out);
                // $rootScope.profilepic=out.data.croped;
                // $rootScope.profilepic=$scope.myCroppedImage;
                $scope.profilepic = out.data.croped;
                console.log(out.data.croped);
                // console.log($scope.myCroppedImage);
                $uibModalInstance.close();
            $scope.getData();

            }
        }).catch(function(error) {
            console.log(error);
            $uibModalInstance.close();

        })


        // console.log("check call",$scope.myCroppedImage);
    } //getData function is called while image is loading
    $scope.getData = function()
  {
    var httpob = getuuData.getData();
    httpobj.then(function(response)
  {
    console.log("uploaded successfully");
    $scope.records=response.data.msg;
  //  console.log($scope.records);
    console.log(response.data);
    },function(response)
  {

  });
  }
});
app.service("getuuData",function($http)
{
this.getData=function()
{
return $http({
url:"/getData",
method:"post"
  })
}
});
