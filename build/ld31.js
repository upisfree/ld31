(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y;c=illuminated.Lamp,f=illuminated.RectangleObject,b=illuminated.DiscObject,e=illuminated.PolygonObject,h=illuminated.Vec2,d=illuminated.Lighting,a=illuminated.DarkMask,i=document.getElementsByTagName("canvas")[0],l=i.getContext("2d"),i.width=window.innerWidth,i.height=window.innerHeight,x=y=0,v=+new Date,r=[new f({topleft:new h(0,150),bottomright:new h(i.width,175)}),new f({topleft:new h(0,i.height-175),bottomright:new h(i.width,i.height-150)}),new f({topleft:new h(100,i.height-300),bottomright:new h(150,i.height-175)})],p=[new c({color:"rgba(255, 220, 150, 0.6)",distance:300}),new c({color:"rgba(255, 220, 150, 0.6)",distance:300,position:new h(500,500)})],o=[],k=function(){var a,b,c,e;for(e=[],b=0,c=p.length;c>b;b++)a=p[b],e.push(o.push(new d({light:a,objects:r})));return e},j=function(){var a,b,c,d;for(d=[],b=0,c=o.length;c>b;b++)a=o[b],d.push(a.compute(i.width,i.height));return d},t=function(){var a,b,c,d;for(d=[],b=0,c=o.length;c>b;b++)a=o[b],d.push(a.render(l));return d},m=new a({lights:p,color:"rgba(0,0,0,0.8)"}),n=0,g=25,k(),w=function(){return j(),m.compute(i.width,i.height)},u=function(){return w()},q=new Image,q.onload=function(){var a;return a=!0},q.src="../assets/galvanized-plate.jpg",s=function(){var a,b;return b=i.width,a=i.height,l.fillStyle="#000",l.fillRect(0,0,b,a),l.save(),l.fillStyle="white",r.forEach(function(a){var b,c;return l.save(),l.beginPath(),a.path(l),l.clip(),b=a.bounds(),c=b.topleft,l.drawImage(q,c.x,c.y),l.restore(),l.save(),l.lineWidth=1,l.strokeStyle="#778",l.beginPath(),a.path(l),l.stroke(),l.restore()}),l.globalCompositeOperation="lighter",t(),l.restore(),l.globalCompositeOperation="source-over",m.render(l)},u(),requestAnimFrame(function z(){requestAnimFrame(z,i);var a=+new Date;a>=n+g&&(n=a,w()),s()},i)}).call(this);