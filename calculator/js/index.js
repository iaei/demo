(function(){
	let $result = document.querySelector('.result');
	let $expr = document.querySelector('.expr')
	let $plus = document.querySelector('.plus');
	let $equal = document.querySelector('.equal');
	let $del = document.querySelector('.del');
	let $number = document.querySelectorAll('.num');
	let $dot = document.querySelector('.dot');
	let $divide = document.querySelector('.divide');
	let $multiply = document.querySelector('.multiply');
	let $minus = document.querySelector('.minus');
	let $btn = document.querySelectorAll('.btn');

	let expr = "";
	let operators = ['+', '-', '×', '÷'];
	let hasCal = false;

	function set(value){
		expr = String(value);
		$expr.innerText = expr;
		$expr.style.color = '#000';
		resize();
		
	}

	set(expr);

	for(let i = 0; i<$number.length;i++){
		$number[i].addEventListener('click',function(event){
			let number = event.currentTarget.getAttribute('data-num');
			set(expr + number);
		})
	}

	function resize(){
		let maxWidth = $result.clientWidth*0.86;
		if($expr.scrollWidth > maxWidth){
			$expr.style.transform = `scale(${maxWidth/$expr.scrollWidth})`;
			$expr.style.transformOrigin = `right center`;
		}else{
			$expr.style.transform = `scale(1)`;
		}
	}

	function op(oper){
		return function (){
			if(operators.indexOf(expr[expr.length - 1]) > -1){
				set(expr.slice(0, expr.length - 1) + oper);
			}else{
				set(expr + oper);
			}
		}
	}


	$plus.addEventListener('click',op("+"));

	$divide.addEventListener('click',op("÷"));

	$multiply.addEventListener('click',op("×"));

	$minus.addEventListener('click',op("-"));


	//使‘.’不能在一个数字中出现两次
	$dot.addEventListener('click',function(event){
		var n = expr.split(/[÷,×,+,-]/);
		if(n[n.length-1].indexOf('.')===-1){
			set(expr+'.');
		}
	})

	//短按del从末尾删除
	$del.addEventListener('click',function(event){
		if(hasCal){
			set("");
			hasCal = false;
			$del.innerText = "DEL";
		}else{
			set(expr.slice(0,expr.length-1));
		}
	})

	//长按del清空
	var c = 0;
	$del.addEventListener('mousedown',function(event){
		time = setInterval(function(){
			c++;
			if(c>1){
				set("");
				$result.style.background = "rgb(208, 79, 137)";
			};
		},500)
		
	})

	$del.addEventListener('mouseup',function(event){
		clearInterval(time);
		$result.style.background = "#fff";
	})



	$equal.addEventListener('click',function(event){
		var digit=2;
		var di= [];
		var maxdi = [];
		
		//将乘除符号改为*/
		if(operators.indexOf(expr[expr.length-1])===-1){
			let fixExpr = expr.split('');
			for(let i in fixExpr){
				switch (fixExpr[i]) {
					case "÷":
						fixExpr[i]="/";
						break;
					case "×":
						fixExpr[i]="*";
						break;
					case ".":
						di.push(i);
						break;
				}		
			}
			fixExpr =fixExpr.join("");
			
		//改善浮点数计算精度
			if(di.length>0){
				var n = fixExpr.split(/[+,-,/,*]/);
				for(let i in n){
					let di = n[i].indexOf('.')
					if(di!==-1){
						maxdi.push(n[i].length - di-1);
					}
				}
				digit = maxdi.reduce(function(a,b){return a+b})
				if(digit>9){
					digit=9;
				}
			}	

			try{
				set(eval(fixExpr).toFixed(digit));
				hasCal =true;
				$del.innerText = "CLR";
			}catch(e){
				set("");
				$expr.innerText = "bad expression";
				$result.style.color ="red";
			}
		}
	})

	//添加按键动画
$btn.forEach(function(i){
	i.addEventListener('click',function(){
		i.classList.add('ani')
	});
	i.addEventListener("webkitAnimationEnd",function(){
		i.classList.remove("ani");
	})
	
});


})();