angular.module('Page5',[])
.controller('page5',function ($scope) {
    //图像数组
    var img=[
        {
            'alt':'图片1',
            'src':'photos/1_b.jpg',
            'smallSrc':'photos/1_s.jpg'
        },{
            'alt':'图片2',
            'src':'photos/2_b.jpg',
            'smallSrc':'photos/2_s.jpg'
        },{
            'alt':'图片3',
            'src':'photos/3_b.jpg',
            'smallSrc':'photos/3_s.jpg'
        },{
            'alt':'图片4',
            'src':'photos/4_b.jpg',
            'smallSrc':'photos/4_s.jpg'
        },{
            'alt':'图片5',
            'src':'photos/5_b.jpg',
            'smallSrc':'photos/5_s.jpg'
        },{
            'alt':'图片6',
            'src':'photos/6_b.jpg',
            'smallSrc':'photos/6_s.jpg'
        },{
            'alt':'图片7',
            'src':'photos/7_b.jpg',
            'smallSrc':'photos/7_s.jpg'
        },{
            'alt':'图片8',
            'src':'photos/8_b.jpg',
            'smallSrc':'photos/8_s.jpg'
        },{
            'alt':'图片9',
            'src':'photos/9_b.jpg',
            'smallSrc':'photos/9_s.jpg'
        },{
            'alt':'图片10',
            'src':'photos/10_b.jpg',
            'smallSrc':'photos/10_s.jpg'
        },{
            'alt':'图片11',
            'src':'photos/11_b.jpg',
            'smallSrc':'photos/11_s.jpg'
        },{
            'alt':'图片12',
            'src':'photos/12_b.jpg',
            'smallSrc':'photos/12_s.jpg'
        },{
            'alt':'图片13',
            'src':'photos/13_b.jpg',
            'smallSrc':'photos/13_s.jpg'
        },{
            'alt':'图片14',
            'src':'photos/14_b.jpg',
            'smallSrc':'photos/14_s.jpg'
        },{
            'alt':'图片15',
            'src':'photos/15_b.jpg',
            'smallSrc':'photos/15_s.jpg'
        },{

            'alt':'图片16',
            'src':'photos/16_b.jpg',
            'smallSrc':'photos/16_s.jpg'
        }
    ]
    var index = 0,len=img.length;
    var pageStart = 0,viewNum = 6;

    for(var i=0;i<len;i++){
        img[i].selected = false;
    }
    img[index].selected = true;

    $scope.imageShow = {
        alt:img[index].alt,
        src:img[index].src
    }

    $scope.smallImg=[];

    loadSmallPic(pageStart);

    function loadSmallPic(start) {
        $scope.smallImg.splice(0,$scope.smallImg.length);
        for(var i=0;i<viewNum;i++){
            $scope.smallImg.push(img[start]);
            if(start+1==len){
                start = 0;
            }
            else start++;
        }
    }

    $scope.selectImage = function(){
        $scope.imageShow.alt = img[index].alt;
        $scope.imageShow.src = img[index].src;
        for(var i=0;i<len;i++){
            img[i].selected = false;
        }
        img[index].selected = true;
        for(var item in $scope.smallImg){
            $scope.smallImg[item].selected = false;
        }
        $scope.smallImg[(index+len-pageStart)%len].selected = true;
    }

    $scope.prePicture = function () {
        index = (index-1+len)%len;
        if(index==(pageStart-1+len)%len){
            pageStart = (index-viewNum+len+1)%len;
            loadSmallPic(pageStart)
        }
        $scope.selectImage();
    }

    $scope.nextPicture = function () {
        index = (index+1)%len;
        var end = (pageStart + viewNum - 1 + len)%len;
        if(index==(end+1)%len){
            pageStart = index;
            loadSmallPic(pageStart);
        }
        $scope.selectImage();
    }

    $scope.pickImage = function (picture) {
        for(var i=0;i<len;i++){
            if(picture.alt==img[i].alt){
                index = i;
                img[i].selected = true;
            }
            else{
                img[i].selected = false;
            }
        }
        $scope.selectImage();
    }

});