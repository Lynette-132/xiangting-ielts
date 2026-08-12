(function(){
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