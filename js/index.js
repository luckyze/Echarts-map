$(function(){
	var dataList=[];
	var cTime = new Date();
	console.log(cTime.getTime());
	$.ajax({
		url:"https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&_="+cTime.getTime(),
		dataType:"jsonp",
		jsonp:"callback",
		jsonCallback:"_" + cTime.getTime()
	}).done(function(res){
		var result = JSON.parse(res.data).areaTree ;
		console.log(result);
		console.log(result[0].total);
		console.log(result[0].children);
		
		for(var i in result[0].children){
			console.log(result[0].children[i]);
			dataList.push({
				name:result[0].children[i].name,
				value:result[0].children[i].total.confirm,
				total:result[0].children[i].total
			})
		}
		console.log(dataList);
		
		var myChart = echarts.init($('#main')[0]);
		var option = {
			title:{text:'2020年疫情地图'},
			tooltip:{
				formatter:function(params,ticket,callback){
					return params.name + params.seriesName + '<br/>' +'确诊:'+params.data.total.confirm +'<br/>' + '疑似:'+params.data.total.suspect + '<br/>' + '死亡:' + params.data.total.dead + '<br/>' +'治愈:' + params.data.total.heal
				}
			},
			visualMap:{
				min:0,
				max:200,
				left:'left',
				top:'bottom',
				text:['高','中','低'],
				inRang:{
					
					color:['#e0ffff','#8eaa8d','#78aa7b','#67aa66','#38aa4f','#00aa0e',],
					},
				show:true
			},
			geo:{
				map:'china',
				roam:false,
				zoom:1.23,
				label:{
					normal:{
						show:true,
						fontSize:'10',
						color: 'rgba(0,0,0,0.6)'
					}
				},
				itemStyle:{
					normal:{borderColor:'rgba(0,0,0,0.7)'},
					emphasis:{
						areaColor:'#f3b329',
						shadowOffsetX:0,
						shadowOffsetY:0,
						shadowBlur:20,
						borderWidth:0,
						shadowColor:'rgba(0,0,0,0.5)'
					}
				}
			},
			series:[{name:'疫情详情',type:'map',geoIndex:0,data:dataList}]
		}
	    
		myChart.setOption(option);
		
	}).fail(function(){
		
	});
});