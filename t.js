const url = window.location.href +"?page="+page;
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				const data = JSON.parse(this.responseText);

				try {
					const script = document.getElementById("templateComment").innerHTML;
					const template = Handlebars.compile(script);
					const render = template(listComment);
					document.getElementById("collapse-1").innerHTML = render;
				} catch (err) {
					alert("ERROR");
				}
			}
		};


		xhttp.open("GET", url, true);
		xhttp.send();