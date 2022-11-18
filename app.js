/*
window.addEventListener("load", function() {
  console.log("Terve!");
});
*/

   var kanava=0;
   var numero=0;
   //var viimnumero=100;
   var viimeiset = [];
   var alanumero=1;
   var viive=0;
   
   var subpagecount = -1;
   var prevpg = -1;
   var nextpg = -1;
   var time = -1;
   var ikkuna=0;
   
   
   function makeurl(channel, page, subpage){

      const teletexturl="https://external.api.yle.fi/v1/teletext";
      const authstring="app_id=f423e033&app_key=d25e3e32bb783babcd58418b927ade53";

      if(kanava==0){
         if(subpage==-1){
            //return "redirect/yle-page.php?page="+page;
            return teletexturl+"/pages/"+page+".xml?"+authstring;
         }else{
            //return "redirect/yle.php?page="+page+"&subpage="+subpage;
            return teletexturl+"/images/"+page+"/"+subpage+".png?"+authstring;
         }
      }
   }
   
	function pad(num, size) {
		var s = "000" + num;
		return s.substr(s.length-size);
	}

   function preloadImage(url)
   {
       var img=new Image();
       img.src=url;
   }

   function handleKeyDown(evt) {
      
      console.log(evt.key);
      
      /*
       switch (evt.key) {
           case 'SoftLeft':
               // Action case press left key
               softkeyCallback.left();
           break;

           case 'SoftRight':
               // Action case press right key
               softkeyCallback.right();
           break;

           case 'Enter':
               // Action case press center key
               softkeyCallback.center();
           break;
       }
       */
   };

   document.addEventListener('keydown', handleKeyDown);

	function vaihda(){
	
		var element = document.getElementById("numero");
		//element.step = 0.01;
		element.step = 1;
		
      //element.blur();
      //closeFullscreen();
				
      if(Number(parseFloat(element.value)) == Number(numero)){
         element.select();
         element.focus();      
         openFullscreen();
         return;
      }
      
      if(element.value == 0){         
         //element.value = 100;
      }
      
      var uusinumero=parseFloat(element.value);
      if(uusinumero>=100 && uusinumero<=899){
         viimeiset.push(numero);
      }
      
      if(element.value == 0){         
         if(viimeiset.length>0){
            //element.value = viimnumero;
            element.value = viimeiset.pop();
         }else{
            element.value = numero;
         }
         uusinumero=parseFloat(element.value);
      }
      
      if(element.value == 9){         
         
         
         ikkuna++;
         if(ikkuna>2){
            ikkuna=0;
         }
         
         paivitaIkkuna();
         
         element.value=numero;
         element.select();
         return;
      }
      
      
      if(Number(uusinumero) > 999){
         uusinumero=Number(uusinumero)%1000;
         element.value=uusinumero;
         return;
      }
      
      
      
      /*
      if(getDecimal(numero)>0.95){
      
         numero = numero - getDecimal(numero);
         element.value=numero;
         return;
         
      }
      */
      
      
      alanumero = 1;

   /*
      if(numero>0 && numero<9){
         numero=numero*100;
         //element.value=numero;
      }

      if(numero>9 && numero<90){
         numero=numero*10;
         //element.value=numero;
      }

      if(numero==99){
         numero=100;
         //element.value=numero;
      }
      */
      
      /*
      if(uusinumero>=900 && uusinumero<=950){
         //numero=899;
         kanava=uusinumero-900;
         //element.value=uusinumero;
         numero=100; 
         element.value=uusinumero;
      }
      */
      
      if(uusinumero>=100 && uusinumero<=899){
      
         //numero=uusinumero;
      
         if(Number(uusinumero) == Number(numero)+1 && nextpg != -1){
            uusinumero=nextpg;
            element.value=uusinumero;
         }else if(Number(uusinumero)==Number(numero)-1 && prevpg != -1){
            uusinumero=prevpg;
            element.value=uusinumero;
         }
         
         if(numero!=uusinumero){
            //viimnumero = numero;
            
            numero=uusinumero;
         }
         
         clearPageData();
      
         //element.value=numero*100+1;
         
         /*
         alanumero = Math.round((numero-Math.floor(numero)) * 100);
         
         if(alanumero==0){
            alanumero=1;   
            //element.value = numero + 0.01;
         }
         numero=Math.floor(numero);
         */
         
         element.select();
         element.focus();
         
         openFullscreen();
      
         viive=0;
         document.getElementById("sivu").src = makeurl(kanava, numero, alanumero);
         loadPageData(makeurl(kanava, numero, -1));
         
         /*
         if(kanava==0){
            //document.getElementById("sivu").src = "https://yle.fi/tekstitv/images/P"+numero+"_"+pad(alanumero, 2)+".gif";
            //document.getElementById("sivu").src = "https://external.api.yle.fi/v1/teletext/images/"+numero+"/"+alanumero+".png?app_id=f423e033&app_key=d25e3e32bb783babcd58418b927ade53";
            
            //pages = pageCount("http://ohjelmakartta.fi/miniteletext/redirect/yle-page.php?page="+numero);
            
            
            //https://external.api.yle.fi/v1/teletext/images/200/1.png?app_id=f423e033&app_key=d25e3e32bb783babcd58418b927ade53
         }
         
         if(kanava==1){
            document.getElementById("sivu").src = "http://www.mtvtekstikanava.fi/new2008/images/"+numero+"-"+pad(alanumero, 2)+".gif";  
         }
         
         if(kanava==2){
            // https://www.nrk.no/teletextresources/100.1-w500.gif
            document.getElementById("sivu").src = "https://www.nrk.no/teletextresources/"+numero+"."+alanumero+"-w500.gif";  
         }
         
         if(kanava==3){
            // https://www.nrk.no/teletextresources/100.1-w500.gif
            document.getElementById("sivu").src = "img/P"+numero+"-00"+pad(alanumero, 2)+".png";  
         }
         
         if(kanava==10){
            document.getElementById("sivu").src = "https://cdn.fmi.fi/legacy-fmi-fi-content/products/sea-level-observation-graphs/plot.php?station=8&lang=fi";
         }
         
         if(kanava==11){
            document.getElementById("sivu").src = "https://cdn.fmi.fi/weather-analysis/products/europe/2020022512_eu_analyysi_fi.png";
         }
         */
         
         
      }

      /*
      if(numero>9999 && numero<90000){
         alanumero=numero % 100;	
         numero=(numero/100 | 0);
         if(alanumero==0){
            alanumero=1;
            element.value=numero;
         }		
         element.select();
         element.focus();
      }*/



      //element.select();
      //element.focus();
   
	}

	function kello() {
	
		var today = new Date();
		var da = today.getDate();
		var mo = today.getMonth();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		da = pad(da, 2);
		mo = pad(mo, 2);		
		h = pad(h, 2);
		m = pad(m, 2);
		s = pad(s, 2);
		document.getElementById('txt').innerHTML =
            numero + " YLE TEKSTI-TV " +
				da + "." + mo + "." + h + ":" + m + ":" + s;
				
		setTimeout(kello, 1000);
		
		/* Automaattinen alasivun vaihto
		if(time > -1){
         viive++;
         if(viive > time){
            viive=0;
            alanumero++;
            if(alanumero > subpagecount){
               alanumero=1;
            }
            document.getElementById("sivu").src = makeurl(kanava, numero, alanumero);
         }
      }
      */
      
	}
	
	/* Get the documentElement (<html>) to display the page in fullscreen */
   var elem = document.documentElement;

   /* View in fullscreen */
   function openFullscreen() {
      if(false){
         if (elem.requestFullscreen) {
            elem.requestFullscreen();
         } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
         } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
         } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
         }
      }
   }

   /* Close fullscreen */
   function closeFullscreen() {
      if(false){
         if (document.exitFullscreen) {
            document.exitFullscreen();
         } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
         } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
         } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
         }
      }
   }
   
   function getDecimal(n) {
      return (n - Math.floor(n));
   }
   
   function myFunction() {
   
   /*
      var element = document.getElementById("numero");
      //if(parseInt(element.value) >= 100){
         if(getDecimal(element.value) > 0.01){
            //element.value = parseFloat(element.value) - 0.01;
            //vaihda();
            //element.value = Math.ceil(element.value);
         }else{
            //element.value = (1 + parseInt(element.value));
         }
      //}
      */
   }
   
   function keyUp() {
   
      var x = event.which || event.keyCode;
      alert(x);
      
   }
   
   function paivitaIkkuna() {
      var d = document.getElementById("sivu");
      if(ikkuna==0){            
         d.className = "";
      }
      if(ikkuna==1){
         d.className = "vaaka1";
      }
      if(ikkuna==2){
         d.className = "vaaka2";            
      }      
   }
   
   function clearPageData() {
   
      subpagecount = -1;
      prevpg = -1;
      nextpg = -1;
      time = -1;
      
      if(ikkuna!=0){
         ikkuna=0;
         paivitaIkkuna();
      }
      
   }
   
   function loadPageData(url) {

      clearPageData(url);
   
      var x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.onreadystatechange = function () {
      if (x.readyState == 4 && x.status == 200)
      {
         var doc = x.responseXML;
         
         subpagecount = doc.getElementsByTagName("teletext")[0].getElementsByTagName("page")[0].getAttribute('subpagecount');
         prevpg = doc.getElementsByTagName("teletext")[0].getElementsByTagName("page")[0].getAttribute('prevpg');
         nextpg = doc.getElementsByTagName("teletext")[0].getElementsByTagName("page")[0].getAttribute('nextpg');
         
         preloadImage(makeurl(kanava, nextpg, 1));
         
         
         if(subpagecount>1){
            time = doc.getElementsByTagName("teletext")[0].getElementsByTagName("page")[0].getElementsByTagName("subpage")[0].getAttribute('time');
         }

      }
      };
      x.send(null);
      
      document.getElementById("numero").select();
      
   }
   
   function keyPressed(e) {
      //See notes about 'which' and 'key'
      //keyCode: 38-ylÃ¶s, 40-alas, 37-vasen, 39-oikea, 13-keskinappi
      //key: call, enter, arrowup, 0, 1, 2, ...
      
      //document.title = e.keyCode;
      //document.title = e.key;
      
      if(subpagecount>-1){ 
         if(e.keyCode==37){
            alanumero--;
            if(alanumero < 1){
               alanumero=subpagecount;
            }         
            document.getElementById("sivu").src = makeurl(kanava, numero, alanumero);
            document.getElementById("numero").select();
         }
         
         if(e.keyCode==39){
            alanumero++;
            if(alanumero > subpagecount){
               alanumero=1;
            }
            document.getElementById("sivu").src = makeurl(kanava, numero, alanumero);
            
         }
      }

   }


