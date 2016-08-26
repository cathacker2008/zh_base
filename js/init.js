require.config({
	paths:{
		'jquery':['./jquery-1.8.3.min']
		//'zh':['./zh'],
		//'zhTable':['./zhTable'],
		//'zhPage':['./zhPage']
	}
});
require(['jquery','zh','jquery.slimscroll.min','zhTable','zhPage','colResizable-1.6','jquery.table2excel'],function($){
	$zh.logOpen = true;
	var data = {rows:[{id:1,name:'陈奕迅',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:2,name:'周杰伦',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:3,name:'李荣浩',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:4,name:'张学友',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:5,name:'刘德华',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:6,name:'谢霆锋',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:7,name:'五月天',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:8,name:'张靓颖',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:9,name:'林俊杰',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'},{id:10,name:'陈小春',phoneNumber:'13550079800',brithday:'1987/12/22',status:'正常',option:'ssss'}],total:10};
	var table;
	var formatButton = function(val,row,col){
		var panel = $zh.createDom('div:','',null,null);	
		var b1 = $zh.createDom('button:button button-rounded button-action','',{
			html:'查看',
			click:function(){$zh.log(row)}
		},panel);
		var b2 = $zh.createDom('button:button button-rounded button-action','',{
			html:'删除',
			click:function(){
				if(confirm('确定要删除吗？')){
					$zh.log(row);
					table.getData();
				}
			}
		},panel);
		$(b1).css({'padding':'0 10px','margin-right':'10px','backgroundColor':'#6CD1C2','borderColor':'#6CD1C2'});
		$(b2).css({'padding':'0 10px','backgroundColor':'#6CD1C2','borderColor':'#6CD1C2'});
		return panel;
	}
	var tableConfig = {
		//url:'../'+parent.desk.server.getUrl('deskTopList'),
		data:data,
		type:'post',
		mark:'id',
		keys:[{title:'姓名',key:'name',orderBy:'asc',defOrder:true},{title:'手机',key:'phoneNumber',orderBy:'asc'},{title:'出生日期',key:'brithday'},{title:'状态',key:'status'},{title:'操作',key:'option',formatter:formatButton,orderBy:'asc'}],//defOrder 在未使用order字段时标示缺省排序的字段。
		order:{key:'phoneNumber',orderBy:'asc'},
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:true,
		size:10,
		notFixedHead:false,//false为固定表头
		drag:true,//拖动列宽
		rowHeight:60,
		//height:600,
		//width:'100%',
		listener:['status'],
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(obj && obj.parentObj && this.checkBox){
				$(obj.parentObj.checkBox).click();
			}
			//if(obj && obj.parentObj){
				//if(this.checkObj){
					//this.checkObj.checked = false;
					//$(this.checkObj.dom).css('backgroundColor',this.checkObj.orginColor);
				//}
				//this.checkObj = obj.parentObj;
				//this.checkObj.checked = true;
				//$(this.checkObj.dom).css('backgroundColor','#DFF5FE');
			//}	
		},
		checked:function(obj,arr,unCheckArr){
			var color = obj.checked?'#DFF5FE':obj.orginColor;
			$(obj.dom).css('backgroundColor',color);
			obj.dom.lastColor = color;
		},
		mouseOver:function(obj){
			$(obj.dom).css('backgroundColor','#DFF5FE');
		},
		mouseOut:function(obj){
			$(obj.dom).css('backgroundColor',obj.checked?'#DFF5FE':obj.orginColor);
		},
		callback:function(table){
		}	
	};
	var initSelect = function(table){
		var keys = table.config.keys;
		var len = keys.length;
		var map = {};
		if(!len){return;}
		for(var i=0;i<len;i++){
			var li = $zh.createDom('li:','',null,$('.selectPanel')[0]);
			var input = $zh.createDom('input:select-input','',{
			},li);
			input.type='checkbox';
			input.style.height='14px';
			input.style.width='14px';
			input.checked='checked';
			map[i] = keys[i];
			input.colNum = i;
			input.colKey = keys[i];
			$(input).on('click',function(e){
				e.stopPropagation();
			});
			$(input).on('change',function(){
				var arr = [];
				$('.select-input:checked').each(function(i,n){
					arr.push(map[this.colNum]);
				});
				table.config.keys = arr;
				console.log(table.config.keys);	
				table.init();
			});
			var span = $zh.createDom('span:','',{html:keys[i].title},li);
		}
	}
	$(function(){
		table = $('.tableContainer').zhTable(tableConfig);
	
		$(".toExcel").click(function(){
			$(".tableContainer").table2excel({
				exclude: ".noExl",
				name: "Excel Document Name",
				filename: "myFileName",
				exclude_img: true,
				exclude_links: true,
				exclude_inputs: true
			});
		});
		$('.btn').on('click',function(e){
			e.stopPropagation();
			$('.selectPanel').toggle();	
		});
		$(document).on('click',function(){
			$('.selectPanel').hide();
		});
		initSelect(table);
		window.aaa= table;
		//$zh.absCenter($('.absTestPanel'));
	})
});
