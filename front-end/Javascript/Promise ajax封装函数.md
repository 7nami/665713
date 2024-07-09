$.ajax({ //异步代码 等待其他代码执行后执行
    url: "http://127.0.0.1:3001/movies/",
    method: "GET",//如果不写，默认为GET
    dataType: "json",
    /* data: {
        pageSize: 3,
        currentPage: 2
    }, *///要传递的数据，是以对象的形式传递
    success(res) {
        //请求成功的返回
        if(res.code == 1){
            console.log(res);
            const movies = res.data
            console.log(movies);
            console.log(res.data);
            console.log(res.data[0].title);
            // 使用 jQuery 来更新 DOM
            $("#hot-movie").html(renderMovies(movies.nowPlaying));
            $("#new-movie").html(renderMovies(movies.upComing));
        }

    },
    error(error) {
        // 请求失败的返回
        console.log("出错了：",error);
    }


})