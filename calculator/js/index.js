(function(){
	let $result = document.querySelector('.result');
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
		$result.innerText = expr;
		$result.style.color = '#000';
		//$result.style.background="#fff";
		
	}

	set(expr);

	for(let i = 0; i<$number.length;i++){
		$number[i].addEventListener('click',function(event){
			let number = event.currentTarget.getAttribute('data');
			set(expr + number);
		})
	}



	$plus.addEventListener('click',function(event){
		if(operators.indexOf(expr[expr.length-1])>-1){
			set(expr.slice(0,expr.length-1)+"+");
		}else{
			set(expr+"+");
		}
	})

	$divide.addEventListener('click',function(event){
		if(operators.indexOf(expr[expr.length-1])>-1){
			set(expr.slice(0,expr.length-1)+"÷");
		}else{
			set(expr+"÷");
		}
	})

	$multiply.addEventListener('click',function(event){
		if(operators.indexOf(expr[expr.length-1])>-1){
			set(expr.slice(0,expr.length-1)+"×");
		}else{
			set(expr+"×");
		}
	})

	$minus.addEventListener('click',function(event){
		if(operators.indexOf(expr[expr.length-1])>-1){
			set(expr.slice(0,expr.length-1)+"-");
		}else{
			set(expr+"-");
		}
	})



	$dot.addEventListener('click',function(event){
		var n = expr.split(/[÷,×,+,-]/);
		if(n[n.length-1].indexOf('.')===-1){
			set(expr+'.');
		}
	})

	//短按从末尾删除
	$del.addEventListener('click',function(event){
		if(hasCal){
			set("");
			hasCal = false;
			$del.innerText = "DEL";
		}else{
			set(expr.slice(0,expr.length-1));
		}
	})

	//长按清空
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
				$result.innerText = "bad expression";
				$result.style.color ="red";
			}
		}
	})

//添加按键动画

for(let i in $btn){
	$btn[i].addEventListener('click',function(event){
		console.log(this.classList.contains('anm'));
		if(this.classList.contains('ani')){
			this.classList.remove("ani");
			this.classList.add("anm");
		}else if(this.classList.contains('anm')){
			this.classList.remove("anm");
			this.classList.add("ani");
		}
		
		
	});
	
}


})();