(function(){
  const versionUrl=new URL('../site-version.json',document.currentScript.src);
  const versionKey='xiangting-ielts:site-version';
  function showUpdate(version){
    if(document.querySelector('.update-banner'))return;
    const banner=document.createElement('div');
    banner.className='update-banner';
    banner.setAttribute('role','status');
    Object.assign(banner.style,{position:'sticky',top:'0',zIndex:'30',display:'flex',justifyContent:'center',alignItems:'center',gap:'12px',padding:'10px 16px',background:'#fff4dc',borderBottom:'1px solid #d8ad6f',color:'#24312b',fontFamily:'Arial,sans-serif',fontWeight:'700'});
    banner.innerHTML='<span>课程有更新</span><button type="button">刷新到最新版</button>';
    banner.querySelector('button').addEventListener('click',()=>{
      localStorage.setItem(versionKey,version);
      const url=new URL(location.href);
      url.searchParams.set('course_version',version);
      location.replace(url.href);
    });
    document.body.prepend(banner);
  }
  async function checkVersion(){
    try{
      const response=await fetch(versionUrl.href+'?t='+Date.now(),{cache:'no-store'});
      if(!response.ok)return;
      const data=await response.json();
      const current=String(data.version||'');
      if(!current)return;
      const seen=localStorage.getItem(versionKey);
      if(seen&&seen!==current)showUpdate(current);
      else if(!seen)localStorage.setItem(versionKey,current);
    }catch(_error){}
  }
  checkVersion();
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')checkVersion()});

  const page=document.body.dataset.page;
  if(!page)return;
  const fields=[...document.querySelectorAll('textarea,input,select')].filter(el=>el.id);
  const note=document.querySelector('[data-save-note]');
  fields.forEach(el=>{
    const key='xiangting-ielts:'+page+':'+el.id;
    const saved=localStorage.getItem(key);
    if(saved!==null)el.value=saved;
    el.addEventListener('input',()=>{
      localStorage.setItem(key,el.value);
      if(note){note.textContent='已自动保存在这台设备';clearTimeout(note._timer);note._timer=setTimeout(()=>note.textContent='',2200)}
    });
  });
})();
